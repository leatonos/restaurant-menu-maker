import { NextApiRequest, NextApiResponse } from 'next';
import { MenuStyle, RestaurantMenu } from '@/app/types/types';
import { NextRequest, NextResponse } from "next/server";
import { S3Client,  ListObjectsCommand, DeleteObjectCommand, DeleteObjectsCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { Document, MongoClient, ObjectId, UpdateFilter } from 'mongodb';
import { Gallery, GalleryFile } from "@/app/types/types";

const Bucket = 's3-restaurant-menu-maker'
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  }
});

// MongoDB Info
const uri = process.env.MONGODB_URI as string
const dbName = "TheOnlineMenu";
const galleryColletion = "Galleries";
const restaurantColletion = "Restaurants";
const userColletion = "Users";
 
interface deleteRequestData {
    userId:string
}

interface accessTokenData {
    access_token: string;
    expires_in: number;
    token_type: string;
}

async function deleteUserFromAuthZero (clientId:string, clientSecret:string){

  try {
    const tokenRequestBody = {
       client_id:clientId,
       client_secret:clientSecret,
       audience:"https://dev-gf8pee0qy43qs7d8.us.auth0.com/api/v2/",
       grant_type:"client_credentials"
   }

    const authTokenRequest = await fetch('https://dev-gf8pee0qy43qs7d8.us.auth0.com/oauth/token',{
       method:'POST',
       headers: { 'content-type': 'application/json' },
       body:JSON.stringify(tokenRequestBody)
     })
     
       const authResponse:accessTokenData = await authTokenRequest.json()
     
       console.log(authTokenRequest.ok)
       console.log(authResponse)


       if(authResponse){
           const deleteRequest = await fetch(`https://dev-gf8pee0qy43qs7d8.us.auth0.com/api/v2/users/${clientId}`,
               {method: 'DELETE',
               headers: {'content-type': 'application/json',
               authorization: `Bearer ${authResponse.access_token}`}
           })
   
           console.log(deleteRequest)

       }
   console.log("User deleted from Auth0")
   return "Success"
 } catch (error) {
   console.error(error);
   return "Error"
 }

}

async function deleteUserFromDatabase(mongoURI:string, userId:string) {
  const mongoClient = await MongoClient.connect(mongoURI);

  try {

    const db = mongoClient.db(dbName);
    const userCol = db.collection(userColletion);
    const galleryCol = db.collection(galleryColletion);
    
    // Deleting User Record
    console.log('Deleting user record...')
    const userFilter = { ownerId: userId };
    const deleteUserResult = await userCol.deleteOne(userFilter)

    if (deleteUserResult.deletedCount === 1) {
      console.log("Successfully deleted user from mongo database");
    } else {
      console.log("No users found");
    }

    //Getting galleryId
    const galleryFilter = { galleryOwner: userId };
    const userGallery = await galleryCol.findOneAndDelete(galleryFilter)

    const galleryId = userGallery?._id

    if(galleryId){
      console.log('Gallery record deleted')
      return galleryId.toString()
    }else{
      console.log('Gallery not found')
    }

    

  } catch (error) {
    console.error(error);
  } finally {
    await mongoClient.close();
  }

}

async function deleteGalleryFiles(galleryId:string){

  try {
  //Create a list with all the objects in the folder
  const listParams = {
    Bucket: 's3-restaurant-menu-maker',
    Prefix: galleryId + '/',  // Assuming folder names end with a '/'
};
  const listCommand = new ListObjectsV2Command(listParams);
  const listResponse = await s3.send(listCommand);

  if(listResponse && listResponse.Contents && listResponse.Contents.length > 0){
    const deleteParams = {
      Bucket: 's3-restaurant-menu-maker',
      Delete: {
          Objects: listResponse.Contents.map((item) => ({ Key: item.Key })),
      },
    };
    const deleteCommand = new DeleteObjectsCommand(deleteParams);
    const deleteResponse = await s3.send(deleteCommand);
    console.log('Folder deleted successfully:', deleteResponse);
  }else{
    console.log('No Gallery was found');
  }
  
}catch(error){
  console.error('Error deleting folder:', error)
}

}



export async function POST(request: Request)  {

    const clientId = process.env.AUTH0_CLIENT_ID as string
    const clientSecret = process.env.AUTH0_CLIENT_SECRET as string

    const data:deleteRequestData = await request.json()
    console.log(data.userId)

    
    const deleteFromAuthZeroResult = await deleteUserFromAuthZero(clientId,clientSecret)
    const galleryDatabaseRequest = await deleteUserFromDatabase(uri,data.userId)
    if(galleryDatabaseRequest){
      const requestDeleteFolder = await deleteGalleryFiles(galleryDatabaseRequest)
    }

      
        
    return NextResponse.json({ message: `API EXECUTED PROCEED`}, { status: 200 })
     
}
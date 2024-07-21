
import { NextRequest, NextResponse } from "next/server";
import { S3Client,  ListObjectsCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Document, MongoClient, ObjectId, UpdateFilter } from 'mongodb';
import { Gallery, GalleryFile } from "@/app/types/types";

// Replace these with your actual connection details
const uri = process.env.MONGODB_URI as string
const dbName = "TheOnlineMenu";
const collectionName = "Galleries";


/**
 * Removes the file register in the database
 * @param fileIdToDelete 
 */
async function deleteFileByIdDatabase(galleryId: string, fileIdToDelete: string){

  const client = await MongoClient.connect(uri);

  try {

    const db = client.db(dbName);
    const collection = db.collection<Gallery>(collectionName);
    
    const filter = { _id: new ObjectId(galleryId) };
    const update = { $pull: { files: { fileId: fileIdToDelete } } };

    const updateResult = await collection.updateOne(filter, update )
    console.log(updateResult)

  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }

}


const Bucket = 's3-restaurant-menu-maker'
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  }
});

interface deleteRequest{
    ownerId: string
    galleryId: string,
    filesToDelete: GalleryFile[]
}


// endpoint to delte a file from the bucket
export async function POST(request: NextRequest) {

    console.log('Lets go slow here....')
    const deleteRequest:deleteRequest = await request.json()

    const filesToDelete = deleteRequest.filesToDelete
 
  const responses = await Promise.all(
    filesToDelete.map(async (fileToDelete: GalleryFile) => {
      const Key = `${deleteRequest.galleryId}/${fileToDelete.fileName}-${fileToDelete.fileId}`;
      console.log(Key)
      // Upload the file to S3
      const response = await s3.send(new DeleteObjectCommand({ Bucket, Key }));
      const databaseDeleteResult = await deleteFileByIdDatabase(deleteRequest.galleryId,fileToDelete.fileId)

      console.log(response)

    })
  );

  console.log("All files deleted:", responses);
  return NextResponse.json({message:'All files deleted:'},{status:200});


}
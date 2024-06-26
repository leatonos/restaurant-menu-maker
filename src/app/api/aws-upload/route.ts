
import { NextRequest, NextResponse } from "next/server";
import { S3Client,  ListObjectsCommand,  PutObjectCommand } from "@aws-sdk/client-s3";
import { Document, MongoClient, ObjectId, UpdateFilter } from 'mongodb';
import { Gallery, GalleryFile } from "@/app/types/types";
import { getGallery } from "@/app/server-actions/get-gallery";

// Replace these with your actual connection details
const uri = process.env.MONGODB_URI as string
const dbName = "TheOnlineMenu";
const collectionName = "Galleries";

/**
 * Insert a new File into the gallery
 * @param url 
 * @param ownerId 
 * @param galleryId 
 * @param fileName 
 * @param fileType 
 * @param fileSize 
 */
async function updateGalleryDatabase(url:string, ownerId: string, galleryId: string, fileName: string, fileType:string, fileSize:number){

  const client = await MongoClient.connect(uri);

  try {

    const db = client.db(dbName);
    const collection = db.collection<Gallery>(collectionName);
    
    const filter = { _id : new ObjectId(galleryId) }
    const newGalleryFile:GalleryFile = {
      fileId: new ObjectId().toHexString(),
      fileName: fileName,
      fileType: fileType,
      fileSize: fileSize,
      fileURL:url
    } 

    const updateAction = { $push : { "files": newGalleryFile } }

    const updateResult = await collection.updateOne(filter, updateAction )

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

// endpoint to upload a file to the bucket
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const files = formData.getAll("file") as File[];
  const ownerId = formData.get("ownerId") as string;
  const galleryId = formData.get("galleryId") as string;

  let uploadCount = 0

  const responses = await Promise.all(
    files.map(async (file) => {
      const Body = (await file.arrayBuffer()) as Buffer
      const Key = `${galleryId}/${file.name}`;

      // Upload the file to S3
      const response = await s3.send(new PutObjectCommand({ Bucket, Key, Body }));

      // Construct the URL for the uploaded file
      const fileUrl = `https://${Bucket}.s3.amazonaws.com/${encodeURIComponent(Key)}`;

      // Register these files in the database
      await updateGalleryDatabase(fileUrl, ownerId, galleryId,file.name,file.type,file.size)
      uploadCount++
      return fileUrl;
    })
  );

  console.log("All files uploaded:", responses);
  return NextResponse.json({message:`A total of ${uploadCount} were uploaded!`},{status:200});
}
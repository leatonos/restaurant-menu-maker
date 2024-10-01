import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { MongoClient, ObjectId } from 'mongodb';
import { Gallery, GalleryFile } from "@/app/types/types";
import sharp from "sharp"
import { Crop } from "react-image-crop";
import { sharpImageCrop } from "@/app/utils/sharpCropper";
import { Resolution } from "@/app/types/types";

// Replace these with your actual connection details
const uri = process.env.MONGODB_URI as string;
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
async function updateGalleryDatabase(url: string, ownerId: string, galleryId: string, fileName: string, fileType: string, fileSize: number, newfileId: string): Promise<GalleryFile> {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection<Gallery>(collectionName);

    const filter = { _id: new ObjectId(galleryId) };
    const newGalleryFile: GalleryFile = {
      fileId: newfileId,
      fileName: fileName,
      fileType: fileType,
      fileSize: fileSize,
      fileURL: url
    };

    const updateAction = { $push: { "files": newGalleryFile } };
    const updateResult = await collection.updateOne(filter, updateAction);

    if (updateResult.modifiedCount === 1) {
      return newGalleryFile;
    } else {
      throw new Error('Failed to update the gallery');
    }
  } catch (error) {
    console.error('Database update error:', error);
    throw error;
  } finally {
    await client.close();
  }
}

const Bucket = 's3-restaurant-menu-maker';
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  }
});

// Endpoint to upload a file to the bucket
export async function POST(request: NextRequest) {
  try {

    const newFileId = new ObjectId().toHexString();
    const formData = await request.formData();
    const files = formData.getAll("file") as File[];
    const ownerId = formData.get("ownerId") as string;
    const galleryId = formData.get("galleryId") as string;
    const imageCropString = formData.get('imageCrop') as string
    const originalResolutionString = formData.get('originalResolution') as string
    const artificialResolutionString = formData.get('artificialResolution') as string

    const imageCrop:Crop = JSON.parse(imageCropString)
    const originalResolution:Resolution = JSON.parse(originalResolutionString)
    const artificialResolution:Resolution = JSON.parse(artificialResolutionString)

    console.log("What we received:")
    console.log(originalResolution)
    console.log(artificialResolution)

    let uploadCount = 0;
    let galleryFiles: GalleryFile[] = [];

    console.log(files)

    const responses = await Promise.all(
      files.map(async (file) => {

        try{

          console.log('Processing Image...')
          const arrayBuffer = await file.arrayBuffer();
          const Body = await sharpImageCrop(arrayBuffer, imageCrop, originalResolution, artificialResolution, 250, 200)
          const Key = `${galleryId}/${newFileId}-${file.name}`;

          console.log('Uploading to AWS...')
          // Upload the file to S3
          await s3.send(new PutObjectCommand({ Bucket, Key, Body }));

          // Construct the URL for the uploaded file
          const fileUrl = `https://${Bucket}.s3.amazonaws.com/${encodeURIComponent(Key)}`;

          // Register these files in the database
          const databaseResult = await updateGalleryDatabase(fileUrl, ownerId, galleryId, file.name, file.type, Body.byteLength, newFileId);
          uploadCount++;
          galleryFiles.push(databaseResult);
          return fileUrl;

        }catch (error) {
          if (error instanceof Error) {
            console.error('Error processing file:', error);
            throw new Error(`Error processing file ${file.name}: ${error.message}`);
          } else {
            console.error('Unknown error processing file:', error);
            throw new Error(`Unknown error processing file ${file.name}`);
          }
        }
      })
    );

    console.log("All files uploaded:", galleryFiles);
    return NextResponse.json({ message: `A total of ${uploadCount} were uploaded!`, images: galleryFiles }, { status: 200 });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ message: 'Failed to upload files', error: error }, { status: 500 });
  }
}

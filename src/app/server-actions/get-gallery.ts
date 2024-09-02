'use server'
import { MongoClient, ObjectId } from 'mongodb';
// Replace these with your actual connection details
const uri = process.env.MONGODB_URI as string
const dbName = "TheOnlineMenu";
const collectionName = "Galleries";

import { NextRequest, NextResponse } from 'next/server'
import { Gallery } from '../types/types';
import Restaurant from '../restaurant/page';
 
export async function getGallery(ownerId: string)  {

  const client = await MongoClient.connect(uri);
  
  if (!ownerId) {
    return { message: 'Missing ownerId parameter' }
  }

  try {
    
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const document = await collection.findOne<Gallery>({ galleryOwner: ownerId });

    if (!document) {
      console.log("Gallery does not exist yet")
      const newGallery = await createGallery(ownerId,client) 
      const createdGallery = newGallery
      console.log(JSON.stringify(newGallery))
      return createdGallery 
    }

    const result:Gallery = {
      _id:document._id?.toString(),
      galleryOwner:document.galleryOwner,
      files: document.files
    }
    
    return result

  } catch (error) {
    console.error(error);
   
  } finally {
    await client.close();
  }

}


async function createGallery(ownerId: string, client:MongoClient) {
  
  const newGalleryObject = {
    _id: new ObjectId(),
    galleryOwner: ownerId,
    files: []
  }

  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const result = await collection.insertOne(newGalleryObject);

  const galleryObjectId = newGalleryObject._id as ObjectId
  const galleryId = galleryObjectId.toJSON()

  const finalResult:Gallery = {
    _id: galleryId,
    galleryOwner: ownerId,
    files: []
  }

    return finalResult

}

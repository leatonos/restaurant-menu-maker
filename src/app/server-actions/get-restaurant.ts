'use server'

import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';


// Replace these with your actual connection details
const uri = process.env.MONGODB_URI as string
const dbName = "TheOnlineMenu";
const collectionName = "Restaurants";

import { NextRequest, NextResponse } from 'next/server'
 
export async function getRestaurant(id: string)  {

  const objectId = id;
  const client = await MongoClient.connect(uri);
  
  if (!objectId) {
    return NextResponse.json({ message: 'Missing objectId parameter' }, { status: 400 })
  }

  try {
    
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const document = await collection.findOne({ _id: new ObjectId(objectId as string) });

    if (!document) {
      return NextResponse.json({ message: 'Document not found' }, { status: 404 })
    }
    return NextResponse.json(document, { status: 200 })
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  } finally {
    await client.close();
  }

}

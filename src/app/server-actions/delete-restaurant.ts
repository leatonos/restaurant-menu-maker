'use server'

import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';


// Replace these with your actual connection details
const uri = process.env.MONGODB_URI as string
const dbName = "TheOnlineMenu";
const collectionName = "Restaurants";

import { NextRequest, NextResponse } from 'next/server'
 
export async function deleteRestaurant(restaurantId: string, ownerId:string)  {


  const client = await MongoClient.connect(uri);
  const objectId = restaurantId
  try {
    
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const deleteResult = await collection.deleteOne({ _id: new ObjectId(objectId as string), ownerId:ownerId });
    console.log("Menu Deleted")
    if (deleteResult.deletedCount < 1) {
      //return NextResponse.json({ message: 'Menu not found' }, { status: 404 })
    }
      return "Menu Deleted"
  } catch (error) {
    console.error(error);
    //return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  } finally {
    await client.close();
  }

}

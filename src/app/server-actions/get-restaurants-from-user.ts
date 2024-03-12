'use server'

import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';
import { RestaurantMenu } from '../types/types';

// Replace these with your actual connection details
const uri = process.env.MONGODB_URI as string
const dbName = "TheOnlineMenu";
const collectionName = "Restaurants";

import { NextRequest, NextResponse } from 'next/server'


/**
 * Returns all the menus from a user
 * @param ownerId - the unique id that comes from auth
 * @returns - An array
 */
export async function getRestaurantsFromUser(ownerId: string)  {

  const client = await MongoClient.connect(uri);
  
  if (!ownerId) {
    return NextResponse.json({ message: 'Missing ownerId parameter' }, { status: 400 })
  }

  try {
    
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const query = {"ownerId": ownerId}
    const cursor = collection.find(query);

    let results = []

    for await (const menu of cursor){
        results.push(menu)
    }
    return results
    //return NextResponse.json(results, { status: 200 })
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  } finally {
    await client.close();
  }

}

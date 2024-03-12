import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';
import { RestaurantMenu } from '../types/types';


// Replace these with your actual connection details
const uri = process.env.MONGODB_URI as string
const dbName = "TheOnlineMenu";
const collectionName = "Restaurants";

import { NextRequest, NextResponse } from 'next/server'
 
export async function createRestaurant(restaurantName:string, ownerId:string, restaurantAddress:string)  {
  const client = await MongoClient.connect(uri);
  const restaurantCollection = client.db(dbName).collection(collectionName)
  const newRestaurant:RestaurantMenu = {
      _id: new ObjectId(),
      ownerId: ownerId,
      restaurantName: restaurantName,
      restaurantAddress: restaurantAddress,
      menuCategories: []
  } 
  try {
    
    const result = await restaurantCollection.insertOne(newRestaurant)

    if (!result) {
      return NextResponse.json({ message: 'Fail' }, { status: 404 })
    }
    return NextResponse.json({ message: `Restaurant menu created with id: ${result.insertedId}` }, { status: 200 })
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  } finally {
    await client.close();
  }

}

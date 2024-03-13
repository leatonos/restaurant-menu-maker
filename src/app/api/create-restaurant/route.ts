import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';
import { RestaurantMenu } from '@/app/types/types';

// Replace these with your actual connection details
const uri = process.env.MONGODB_URI as string
const dbName = "TheOnlineMenu";
const collectionName = "Restaurants";

import { NextRequest, NextResponse } from 'next/server'
 
export async function POST(request: Request)  {

    const data:RestaurantMenu = await request.json()
    console.log(data)
    
    const client = await MongoClient.connect(uri);
    const restaurantCollection = client.db(dbName).collection(collectionName)
    const newRestaurant:RestaurantMenu = {
        _id: new ObjectId(),
        ownerId: data.ownerId,
        restaurantName: data.restaurantName,
        restaurantAddress: data.restaurantAddress,
        menuCategories: []
    } 
    try {
      
      const result = await restaurantCollection.insertOne(newRestaurant)
  
      if (!result) {
        return NextResponse.json({ message: 'Fail' }, { status: 404 })
      }
      console.log(`Restaurant menu created with id: ${result.insertedId}`)
      return NextResponse.json({ message: `Restaurant menu created with id: ${result.insertedId}`, newRestaurantId:result.insertedId }, { status: 200 })
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    } finally {
      await client.close();
    }
    
}
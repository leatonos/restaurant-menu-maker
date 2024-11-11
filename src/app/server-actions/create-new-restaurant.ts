import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';
import { MenuStyle, RestaurantMenu } from '../types/types';


// Replace these with your actual connection details
const uri = process.env.MONGODB_URI as string
const dbName = "TheOnlineMenu";
const collectionName = "Restaurants";

import { NextRequest, NextResponse } from 'next/server'
 
export async function createRestaurant(restaurantName:string, ownerId:string, restaurantAddress:string)  {

  const defaultMenuStyle:MenuStyle= {
    restaurantLogo: 'https://placehold.co/100x100?text=Restaurant\nLogo',
    backgroundColor: '#ffffff',
    menuColor: '#4A1A1A',
    subMenuColor: '#4A1A1A',
    primaryColor: '#ffffff',
    secondaryColor: '#ffffff',
    fontColor: '#000000',
    fontMenuColor: '#ffffff'
  }


  const client = await MongoClient.connect(uri);
  const restaurantCollection = client.db(dbName).collection(collectionName)
  const newRestaurant:RestaurantMenu = {
    _id: new ObjectId(),
    ownerId: ownerId,
    restaurantName: restaurantName,
    restaurantAddress: restaurantAddress,
    menuCategories: [],
    menuStyle: defaultMenuStyle
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

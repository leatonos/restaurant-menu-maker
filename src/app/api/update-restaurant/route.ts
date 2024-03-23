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
    
    const client = await MongoClient.connect(uri);
    const restaurantCollection = client.db(dbName).collection(collectionName)


    const query = {_id: new ObjectId(data._id)}

    const updateAction = {$set:{
      restaurantName:data.restaurantName,
      restaurantAddress:data.restaurantAddress,
      menuCategories:data.menuCategories,
      menuStyle:data.menuStyle
    }}

    try {
    const result = await restaurantCollection.updateOne(query,updateAction, { upsert: false })
    if (!result) {
      return NextResponse.json({ message: 'Fail' }, { status: 404 })
    }
    console.log(`Menus modified: ${result.modifiedCount}`)
    return NextResponse.json({ message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)` }, { status: 200 })
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  } finally {
    await client.close();
  }
    
}

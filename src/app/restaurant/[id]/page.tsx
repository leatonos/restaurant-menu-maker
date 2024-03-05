import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';
import Image from "next/image";
import styles from "./page.module.css";
import { getRestaurant } from '@/app/server-actions/get-restaurant';
import { Suspense } from 'react';


export default async function Restaurant({ params }: { params: { id: string } }) {

    async function getRestaurantData(id:string) {
        const result = await getRestaurant(params.id)
        return result.json()
    }

    const response = await getRestaurantData(params.id)

    return (
        <div>
            <h1>Restaurant ID: {params.id}</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <p>{JSON.stringify(response)}</p>
            </Suspense>
        </div>
        )
  }
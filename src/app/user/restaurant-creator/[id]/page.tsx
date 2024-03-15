import Image from "next/image";
import styles from "@/app/css/restaurant-creator-page.module.css"
import { redirect } from  'next/navigation';
import React, { Suspense, useState } from 'react'
import MenuEditor from "@/app/components/menu-editor-components/menu-editor";
import { useUser } from '@auth0/nextjs-auth0/client';



// Auth0 imports
import UserHeader from "@/app/components/user-components/user-header";
import { useRouter } from "next/navigation";
import { getRestaurant } from "@/app/server-actions/get-restaurant";
import MenuPreview from "@/app/components/menu-editor-components/menu-preview";
import { RestaurantMenu } from "@/app/types/types";


export default async function RestaurantMenuCreator({ params }: { params: { id: string } }) {

  async function getRestaurantData(id:string) {
    const result = await getRestaurant(params.id)
    return result.json()
  }

  const createRestaurant = async(restaurantName:string, ownerId:string, restaurantAddress:string)=>{

    try {
      const response = await fetch('/api/update-restaurant', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ restaurantName:restaurantName, ownerId:ownerId, restaurantAddress:restaurantAddress }),
      });

      if (!response.ok) {
          throw new Error('Failed to create restaurant');
      }else{
        const newRestaurantId = await response.json()
        console.log(newRestaurantId.newRestaurantId)
        //router.push(`/user/restaurant-creator/${newRestaurantId.newRestaurantId}`)
      }


      // Handle success response
      console.log('Restaurant created successfully');
  } catch (error) {
      console.error('Error creating restaurant:', error);
  }


  }

  const restaurantData = await getRestaurantData(params.id) as RestaurantMenu
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };


  return (
    <main>
      <UserHeader/>
      <div className={styles.mainContainer}>
        <Suspense fallback={<div>Loading menus...</div>}>
          <MenuEditor initialData={restaurantData}/>
          <MenuPreview initialData={restaurantData}/>
        </Suspense>
      </div>
    </main>
  );
}

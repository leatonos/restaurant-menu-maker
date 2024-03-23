'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { redirect } from  'next/navigation';
import React, { useEffect, useState } from 'react'
import MenuEditor from "@/app/components/menu-editor-components/menu-editor";
import { useUser } from '@auth0/nextjs-auth0/client';


// Auth0 imports
import UserHeader from "@/app/components/user-components/user-header";
import { useRouter } from "next/navigation";

export default function RestaurantMenuCreator() {

  const { user, error, isLoading } = useUser();
  const router = useRouter()

  const [newRestaurantName,setName] = useState<string>('')
  const [newRestaurantAddress,setAddress] = useState<string>('')


  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log(user)

    if(user){
      await createRestaurant(newRestaurantName, user.sub as string, newRestaurantAddress)
    }
    

};


  const createRestaurant = async(restaurantName:string, ownerId:string, restaurantAddress:string)=>{

    try {
      const response = await fetch('/api/create-restaurant', {
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
        router.push(`/user/restaurant-creator/${newRestaurantId.newRestaurantId}`)
      }


      // Handle success response
      console.log('Restaurant created successfully');
  } catch (error) {
      console.error('Error creating restaurant:', error);
  }


  }

  useEffect(()=>{
    console.log(user)
  },[user])

  return (
    <main>
     <UserHeader/>
     <form onSubmit={handleSubmit}>
      <h1>Create your restaurant</h1>
      <div className="form-control">
        <label htmlFor="restaurant-name">Restaurant Name </label>
        <input id="restaurant-name" onChange={(event) => setName(event.target.value)} type="text" required/>
      </div>
      <div className="form-control">
        <label htmlFor="restaurant-address">Restaurant Address </label>
        <input id="restaurant-address" onChange={(event) => setAddress(event.target.value)} type="text" required/>
      </div>
      <button type="submit">Create Menu</button>
     </form>
    </main>
  );
}

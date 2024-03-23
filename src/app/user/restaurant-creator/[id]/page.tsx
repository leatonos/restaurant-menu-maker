import Image from "next/image";
import styles from "@/app/css/restaurant-creator-page.module.css"
import { redirect } from  'next/navigation';
import React, { Suspense, useState } from 'react'
import MenuEditor from "@/app/components/menu-editor-components/menu-editor";

// Auth0 imports
import UserHeader from "@/app/components/user-components/user-header";
import { useRouter } from "next/navigation";
import { getRestaurant } from "@/app/server-actions/get-restaurant";
import MenuPreview from "@/app/components/menu-editor-components/menu-preview";
import { RestaurantMenu } from "@/app/types/types";
import { getSession } from "@auth0/nextjs-auth0";


export default async function RestaurantMenuCreator({ params }: { params: { id: string } }) {

  const session = await getSession();


  async function getRestaurantData(id:string) {

    const user = session?.user

    //If user not connected this website should not even open
    if(!user){
      redirect('/')
    }

    const request = await getRestaurant(params.id)
    const result = await request.json() as RestaurantMenu

    //If user does not own this menu we send it back to the main menu
    if(result.ownerId != user.sub){
      redirect('/')
    }

    return result

  }

  const restaurantData = await getRestaurantData(params.id) as RestaurantMenu
  

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
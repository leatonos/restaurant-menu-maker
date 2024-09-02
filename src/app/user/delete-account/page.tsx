'use client'

import Image from "next/image";
import styles from "@/app/css/userpage.module.css";
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

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log(user)

    if(user){
      await deteleAccount(user.sub as string)
    }
    

};


  const deteleAccount = async(userId:string)=>{

    try {
      const response = await fetch('/api/delete-user', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId:userId }),
      });

      if (!response.ok) {
          throw new Error('Failed to delete account');
      }else{
       console.log('User deleted!')
       router.push('/api/auth/logout')
      }
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
     <div className={styles.restaurantStarter}>
      <form onSubmit={handleSubmit} className={styles.newRestaurantForm}>
        <h1>Delete account</h1>
        <h2>This action will not only delete your account but also erase all your menus and wipe all the images you have in your gallery</h2>
        <h2>Do you want to proceed?</h2>
        <button type="submit" className="orange-button">Delete my account</button>
      </form>
     </div>
    </main>
  );
}

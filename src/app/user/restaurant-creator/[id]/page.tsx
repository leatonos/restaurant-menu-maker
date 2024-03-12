import Image from "next/image";
import styles from "./page.module.css";
import { redirect } from  'next/navigation';
import React, { Suspense, useState } from 'react'
import MenuEditor from "@/app/components/menu-editor-components/menuEditor";
import { useUser } from '@auth0/nextjs-auth0/client';



// Auth0 imports
import UserHeader from "@/app/components/user-components/user-header";
import { useRouter } from "next/navigation";
import { getRestaurant } from "@/app/server-actions/get-restaurant";

export default async function RestaurantMenuCreator({ params }: { params: { id: string } }) {

  async function getRestaurantData(id:string) {
    const result = await getRestaurant(params.id)
    return result.json()
}

const response = await getRestaurantData(params.id)


  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };


  return (
    <main>
     <UserHeader/>
     <Suspense fallback={<div>Loading...</div>}>
          <p>{JSON.stringify(response)}</p>
      </Suspense>
    </main>
  );
}

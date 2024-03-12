import Image from "next/image";
import styles from "../css/userpage.module.css";
import { useUser } from '@auth0/nextjs-auth0/client';
import ProfileClient from "../components/user-components/userInfo";
import { Session, getSession } from "@auth0/nextjs-auth0";
import { redirect } from  'next/navigation';
import UserHeader from "../components/user-components/user-header";
import { getRestaurantsFromUser } from "../server-actions/get-restaurants-from-user";
import { Key, Suspense } from "react";
import { RestaurantMenu } from "../types/types";
import RestaurantBox from "../components/user-components/restaurant-box";
import { ObjectId } from "mongodb";

async function RestaurantsList({ownerId}: { ownerId : string }) {
  "use server"
  const restaurants = await getRestaurantsFromUser(ownerId) as RestaurantMenu[]
  
  return (
    <div className={styles.restaurantsPannel}>
      {
        restaurants.map((restaurant)=>{
          const restaurantId:string = restaurant._id.toString()
          return <RestaurantBox key={restaurantId} restaurantId={restaurantId} restaurantName={restaurant.restaurantName}/>
        })
      }
    </div>
  )
}

export default async function UserHome() {

  const session = await getSession() as Session
  const user = session.user
  const userRestaurants = await getRestaurantsFromUser(session.user.sub)
  


  if(!user){
    redirect('/')
  }


  return (
    <main>
      <UserHeader/>
      <h1>User Dashboard</h1>
      <div>
        <a href="user/restaurant-creator">Create new Menu</a>
      </div>
      <Suspense fallback={<div>Loading menus...</div>}>
        <RestaurantsList ownerId={user.sub} />
      </Suspense>
    </main>
  );
}

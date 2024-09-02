import Image from "next/image";
import styles from "../css/userpage.module.css";
import { Session, getSession } from "@auth0/nextjs-auth0";
import { redirect } from  'next/navigation';
import UserHeader from "../components/user-components/user-header";
import { getRestaurantsFromUser } from "../server-actions/get-restaurants-from-user";
import { Key, Suspense } from "react";
import { RestaurantMenu } from "../types/types";
import RestaurantBox from "../components/user-components/restaurant-box";
import { ObjectId } from "mongodb";
import AddImage from '../../../public/addWhite.svg'

async function RestaurantsList({ownerId}: { ownerId : string }) {
  "use server"
  const restaurants = await getRestaurantsFromUser(ownerId) as RestaurantMenu[]
  
  return (
    <div className={styles.restaurantsPannel}>
      <CreateRestaurantButton />
      {
        restaurants.map((restaurant)=>{
          const resId = restaurant._id as ObjectId
          const restaurantId:string = resId.toString()
          return <RestaurantBox key={restaurantId} restaurantId={restaurantId} restaurantName={restaurant.restaurantName}/>
        })
      }
    </div>
  )
}

function CreateRestaurantButton() {
  return(
    <div className={styles.createBoxContainer}>
      <a href="user/restaurant-creator" className={styles.createButton}>
      <button className={styles.createButton}>
        <Image className={styles.createIcon} src={AddImage} alt={""}/>
        <h3>Create Menu</h3>
      </button>
      </a>
    </div>
  )
}

export default async function UserHome() {

  const session = await getSession() as Session
  let user = null

  if(session){
    user = session.user
  }

  if(!user){
    redirect('/')
  }

  const userRestaurants = await getRestaurantsFromUser(session.user.sub)



  return (
    <main >
      <UserHeader/>
      <Suspense fallback={<div>Loading menus...</div>}>
        <RestaurantsList ownerId={user.sub} />
      </Suspense>
      <a href="user/delete-account">
        <button className="orange-button">Delete Account</button>
      </a>
    </main>
  );
}

"use client"
import Image from "next/image";
import styles from "@/app/css/restaurant-creator-page.module.css"
import { redirect } from  'next/navigation';
import React, { useEffect } from 'react'

// Redux Imports
import type { RootState } from '@/app/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { createNewCategory, setInitialData, setRestaurantName, setRestaurantAddress} from '@/app/redux/menuCreatorSlice'
import CategoryEditor from "./category-editor";
import { RestaurantMenu } from "@/app/types/types";
import MenuStyleEditor from "./menu-style-editor";


export default function MenuDetailsEditor() {

    const restaurantMenuData = useSelector((state: RootState) => state.restaurantCreator)
    const dispatch = useDispatch()
    
    const setName = (newName: string) =>{
      dispatch(setRestaurantName(newName))
    }
    const setAddress = (newAddress: string) =>{
      dispatch(setRestaurantAddress(newAddress))
    }

  return (
    <div className={styles.restaurantDetailsEditor}>
          <h2>Menu Details</h2>
          <div>
            <label htmlFor="restaurantName">Restaurant name:</label><br/>
            <input 
              type="text" 
              defaultValue={restaurantMenuData.restaurantMenu.restaurantName} 
              onChange={(event)=>setName(event.target.value)} 
              id="restaurantName"
            />
          </div>
          <div>
            <label htmlFor="restaurantAddress">Restaurant address:</label><br/>
            <input 
              type="text" 
              defaultValue={restaurantMenuData.restaurantMenu.restaurantAddress} 
              onChange={(event)=>setAddress(event.target.value)} 
              id="restaurantAddress"
            />
          </div>
        </div>
  );
}

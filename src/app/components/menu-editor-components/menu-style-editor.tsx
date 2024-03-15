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


export default function MenuStyleEditor() {

    const restaurantMenuData = useSelector((state: RootState) => state.restaurantCreator)
    const dispatch = useDispatch()
    const menuCategories = restaurantMenuData.restaurantMenu.menuCategories
  
    const setBackgroundColor = (newName: string) =>{
      dispatch(setRestaurantName(newName))
    }
    const setMenuColor = (newName: string) =>{
      dispatch(setRestaurantName(newName))
    }
    const setSubMenuColor = (newName: string) =>{
      dispatch(setRestaurantName(newName))
    }
    const setPrimaryColor = (newName: string) =>{
      dispatch(setRestaurantName(newName))
    }
    const setSecondaryColor = (newName: string) =>{
      dispatch(setRestaurantName(newName))
    }
    const setFontColor = (newName: string) =>{
      dispatch(setRestaurantName(newName))
    }
    const setRestaurantLogo = (newName: string) =>{
      dispatch(setRestaurantName(newName))
    }

  return (
        <div className={styles.restaurantDetailsEditor}>
          <h2>Menu Styles</h2>
          <div>
            <label htmlFor="restaurantName">Restaurant name:</label>
            <input 
              type="file" 
              defaultValue={restaurantMenuData.restaurantMenu.restaurantName} 
              onChange={(event)=>setBackgroundColor(event.target.value)} 
              id="restaurantName"
            />
          </div>
          <div>
            <label htmlFor="restaurantName">Restaurant name:</label>
            <input 
              type="color" 
              defaultValue={restaurantMenuData.restaurantMenu.restaurantName} 
              onChange={(event)=>setBackgroundColor(event.target.value)} 
              id="restaurantName"
            />
          </div>
          <div>
            <label htmlFor="restaurantName">Restaurant name:</label>
            <input 
              type="color" 
              defaultValue={restaurantMenuData.restaurantMenu.restaurantName} 
              onChange={(event)=>setMenuColor(event.target.value)} 
              id="restaurantName"
            />
          </div>
          <div>
            <label htmlFor="restaurantAddress">Restaurant address:</label>
            <input 
              type="color" 
              defaultValue={restaurantMenuData.restaurantMenu.restaurantAddress} 
              onChange={(event)=>setSubMenuColor(event.target.value)} 
              id="restaurantAddress"
            />
          </div>
          <div>
            <label htmlFor="restaurantAddress">Restaurant address:</label>
            <input 
              type="color" 
              defaultValue={restaurantMenuData.restaurantMenu.restaurantAddress} 
              onChange={(event)=>setSubMenuColor(event.target.value)} 
              id="restaurantAddress"
            />
          </div>
          <div>
            <label htmlFor="restaurantAddress">Restaurant address:</label>
            <input 
              type="color" 
              defaultValue={restaurantMenuData.restaurantMenu.restaurantAddress} 
              onChange={(event)=>setSubMenuColor(event.target.value)} 
              id="restaurantAddress"
            />
          </div>
          <div>
            <label htmlFor="restaurantAddress">Restaurant address:</label>
            <input 
              type="color" 
              defaultValue={restaurantMenuData.restaurantMenu.restaurantAddress} 
              onChange={(event)=>setSubMenuColor(event.target.value)} 
              id="restaurantAddress"
            />
          </div>
        </div>   
  );
}

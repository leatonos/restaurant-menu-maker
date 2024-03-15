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


export default function MenuEditor(props:{initialData:RestaurantMenu}) {

    const restaurantMenuData = useSelector((state: RootState) => state.restaurantCreator)
    const dispatch = useDispatch()
    const menuCategories = restaurantMenuData.restaurantMenu.menuCategories
    useEffect(()=>{
      dispatch(setInitialData(props.initialData))
    },[])
  
    const setName = (newName: string) =>{
      dispatch(setRestaurantName(newName))
    }
    const setAddress = (newAddress: string) =>{
      dispatch(setRestaurantAddress(newAddress))
    }

    const saveChanges = async(updatedRestaurant:RestaurantMenu)=>{

      try {
        const response = await fetch('/api/update-restaurant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedRestaurant),
        });
        if (!response.ok) {
            throw new Error('Failed to update restaurant');
        }else{
          const newRestaurantId = await response.json()
          console.log(newRestaurantId.newRestaurantId)
          //router.push(`/user/restaurant-creator/${newRestaurantId.newRestaurantId}`)
        }
        // Handle success response
        console.log('Restaurant created successfully');
    } catch (error) {
        console.error('Error updating restaurant restaurant:', error);
    }
  
  
    }

  return (
    <div className={styles.editorContainer}>
      <div className={styles.restaurantInfoEditor}>
        <h2>Menu Editor</h2>
        <div>
          <label htmlFor="restaurantName">Restaurant name:</label>
          <input 
            type="text" 
            defaultValue={restaurantMenuData.restaurantMenu.restaurantName} 
            onChange={(event)=>setName(event.target.value)} 
            id="restaurantName"
          />
        </div>
        <div>
          <label htmlFor="restaurantAddress">Restaurant address:</label>
          <input 
            type="text" 
            defaultValue={restaurantMenuData.restaurantMenu.restaurantAddress} 
            onChange={(event)=>setAddress(event.target.value)} 
            id="restaurantAddress"
          />
        </div>
        <button onClick={()=>dispatch(createNewCategory())}>Create Category</button>
      </div>
      <div className={styles.categoriesContainer}>
        {menuCategories.map((category, index)=>(
          <CategoryEditor key={index} category={category} index={index}/>
          ))}
      </div>
      <button onClick={()=>saveChanges(restaurantMenuData.restaurantMenu)}>Save Changes</button>
     
    </div>
  );
}

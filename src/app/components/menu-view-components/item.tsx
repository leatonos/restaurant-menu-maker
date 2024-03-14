"use client"
import Image from "next/image";
import styles from "@/app/css/restaurant-view.module.css"
import React, { useEffect } from 'react'
import { Item, MenuCategory, RestaurantMenu, Subcategory } from "@/app/types/types";


// Redux Imports
import type { RootState } from '@/app/redux/store'
import {useSelector} from 'react-redux'

export default function ItemView(props:{itemInfo:Item}) {

  const available = props.itemInfo.available
  // Hides this section of the menu if user decides this is not available
  if(!available){
    return
  }

  return (
    <div className={styles.itemContainer}>
        <div className={styles.itemDetails}>
            <h4>{props.itemInfo.name}</h4>
            <p>{props.itemInfo.description}</p>
            <p>{props.itemInfo.price}</p>
        </div>
        <div className={styles.itemPhotoContainer}>

        </div>
    </div>
  );
}

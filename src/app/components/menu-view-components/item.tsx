"use client"
import Image from "next/image";
import styles from "@/app/css/restaurant-view.module.css"
import React, { useEffect } from 'react'
import { Item, MenuCategory, RestaurantMenu, Subcategory } from "@/app/types/types";


// Redux Imports
import type { RootState } from '@/app/redux/store'
import {useSelector} from 'react-redux'

export default function ItemView(props:{itemInfo:Item}) {

  //Custom Styles
  const menuStyle = useSelector((state: RootState) => state.restaurantCreator.restaurantMenu.menuStyle)
  const fontColor = menuStyle.fontColor

  const available = props.itemInfo.available
  // Hides this section of the menu if user decides this is not available
  if(!available){
    return
  }

  const formatPrice = (price: number) =>{
    if(isNaN(price as number)){
      return '0.00'
    }else{
      let correct = price as number
      return correct.toFixed(2)
    }
  }


  
  return (
    <div className={styles.itemContainer} style={{color:fontColor}}>
        <div className={styles.itemDetails}>
            <h4 className={styles.itemTitle}>{props.itemInfo.name}</h4>
            <p>{props.itemInfo.description}</p>
            <p>{formatPrice(props.itemInfo.price)}</p>
        </div>
        <div className={styles.itemPhotoContainer}>
            <img src={props.itemInfo.photoURL} width={100}/>
        </div>
    </div>
  );
}

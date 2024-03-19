"use client"
import Image from "next/image";
import styles from "@/app/css/restaurant-view.module.css"
import React, { useEffect } from 'react'
import { MenuCategory, RestaurantMenu, Subcategory } from "@/app/types/types";


// Redux Imports
import type { RootState } from '@/app/redux/store'
import {useSelector} from 'react-redux'
import ItemView from "./item";

export default function SubcategoryView(props:{subcategoryInfo:Subcategory}) {

  const available = props.subcategoryInfo.available
  const items = props.subcategoryInfo.items


  const menuStyle = useSelector((state: RootState) => state.restaurantCreator.restaurantMenu.menuStyle)
  const fontColor = menuStyle.fontColor

  // Hides this section of the menu if user decides this is not available
  if(!available){
    return
  }

  return (
    <div id={props.subcategoryInfo.name} className={styles.subcategoryContainer} style={{backgroundColor: menuStyle.secondaryColor}}>
        <div className={styles.subcategoryDetails} style={{color:fontColor}}>
            <h3 className={styles.subcategoryTitle}>{props.subcategoryInfo.name}</h3>
            <p>{props.subcategoryInfo.description}</p>
        </div>
        <div className={styles.itemsContainer}>
            {items.map((item, index)=>(
                <ItemView key={index} itemInfo={item}/>
            ))}
        </div>
    </div>
  );
}

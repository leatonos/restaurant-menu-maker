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
  // Hides this section of the menu if user decides this is not available
  if(!available){
    return
  }

  return (
    <div className={styles.categoryContainer}>
        <div>
            <h3>{props.subcategoryInfo.name}</h3>
            <p>{props.subcategoryInfo.description}</p>
        </div>
        <div>
            {items.map((item)=>(
                <ItemView itemInfo={item}/>
            ))}
        </div>
    </div>
  );
}

"use client"
import Image from "next/image";
import styles from "@/app/css/restaurant-view.module.css"
import React, { useEffect } from 'react'
import { MenuCategory, RestaurantMenu } from "@/app/types/types";


// Redux Imports
import type { RootState } from '@/app/redux/store'
import {useSelector} from 'react-redux'
import SubcategoryView from "./subcategory";

export default function CategoryView(props:{categoryInfo:MenuCategory}) {

  const available = props.categoryInfo.available
  const subcategories = props.categoryInfo.subcategories
  // Hides this section of the menu if user decides this is not available
  if(!available){
    return
  }

  return (
    <div className={styles.categoryContainer}>
        <div>
            <h2>{props.categoryInfo.name}</h2>
            <p>{props.categoryInfo.description}</p>
        </div>
        <div>
            {subcategories.map((subcategory)=>(
                <SubcategoryView subcategoryInfo={subcategory} />
            ))}
        </div>
    </div>
  );
}

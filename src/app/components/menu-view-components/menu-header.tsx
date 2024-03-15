"use client"
import Image from "next/image";
import styles from "@/app/css/restaurant-view.module.css"
import React, { useEffect } from 'react'
import { MenuCategory, RestaurantMenu } from "@/app/types/types";

// Redux Imports
import type { RootState } from '@/app/redux/store'
import {useSelector} from 'react-redux'
import SubcategoryView from "./subcategory";

export default function MenuHeader(props:{restaurantInfo:RestaurantMenu}) {

  const restaurantStyles = props.restaurantInfo.menuStyle 

  return (
    <header className={styles.menuHeader} style={{background:restaurantStyles.menuColor}}>
         <img src="https://placehold.co/100" />
    </header>
  );
}

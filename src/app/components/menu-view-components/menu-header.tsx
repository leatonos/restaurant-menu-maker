"use client"
import Image from "next/image";
import styles from "@/app/css/restaurant-view.module.css"
import React, { useEffect } from 'react'
import { MenuCategory, RestaurantMenu } from "@/app/types/types";

// Redux Imports
import type { RootState } from '@/app/redux/store'
import {useSelector} from 'react-redux'
import SubcategoryView from "./subcategory";
import MenuNavBar from "./navigation-bar";

export default function MenuHeader(props:{restaurantInfo:RestaurantMenu}) {

  const restaurantStyles = props.restaurantInfo.menuStyle 
  const restaurantCategories = props.restaurantInfo.menuCategories

  return (
    <header className={styles.menuHeader} style={{background:restaurantStyles.menuColor}}>
      <div className={styles.topHeader}>
         <img src={restaurantStyles.restaurantLogo} />
      </div>
         <MenuNavBar categories={restaurantCategories} navBarStyle={restaurantStyles}/>
    </header>
  );
}

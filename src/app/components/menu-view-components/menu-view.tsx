"use client"
import Image from "next/image";
import styles from "@/app/css/restaurant-creator-page.module.css"
import menuViewStyles from "@/app/css/restaurant-view.module.css"
import { redirect } from  'next/navigation';
import React, { useEffect } from 'react'
import { MenuStyle, RestaurantMenu } from "@/app/types/types";

// Redux Imports
import CategoryView from "./category";
import MenuHeader from "./menu-header";


export default function MenuView(props:{restaurantInfo:RestaurantMenu}) {

    const menuInfo = props.restaurantInfo
    const menuStyle = menuInfo.menuStyle
    const categories = menuInfo.menuCategories

  return (
    <div className={menuViewStyles.menuView}>
          <MenuHeader restaurantInfo={menuInfo} />
          <div className={menuViewStyles.menuContainer} style={{backgroundColor:menuStyle.backgroundColor}}>
            {categories.map((category,index)=>(
              <CategoryView key={index} categoryInfo={category} menuStyle={menuStyle}/>
            ))}
          </div>
    </div>
  )
}

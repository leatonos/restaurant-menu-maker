"use client"
import Image from "next/image";
import menuViewStyles from "@/app/css/restaurant-view-fullscreen.module.css"
import { redirect } from  'next/navigation';
import React, { useEffect } from 'react'
import { MenuCategory, MenuStyle, RestaurantMenu } from "@/app/types/types";

// Redux Imports
import CategoryView from "./category";
import MenuHeader from "./menu-header";
import SearchIcon from "./search-icon";
import SearchBar from "./search-bar";


export default function MenuView(props:{restaurantInfo:RestaurantMenu}) {

    const menuInfo = props.restaurantInfo
    const menuStyle = menuInfo.menuStyle
    const categories = menuInfo.menuCategories

  return (
    <div className={menuViewStyles.menuView} style={{backgroundColor:menuStyle.backgroundColor}}>
          <MenuHeader restaurantInfo={menuInfo} />
          <SearchBar restaurantInfo={menuInfo}/>
          <div className={menuViewStyles.menuContainer} style={{backgroundColor:menuStyle.backgroundColor}}>
            {categories.map((category: MenuCategory,index: React.Key | null | undefined)=>(
              <CategoryView key={index} categoryInfo={category} menuStyle={menuStyle}/>
            ))}
          </div>
    </div>
  )
}

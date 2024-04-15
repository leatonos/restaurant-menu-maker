"use client"
import Image from "next/image";
import PreviewStyle from "@/app/css/restaurant-view.module.css"
import FullscreenStyle from '@/app/css/restaurant-view-fullscreen.module.css'
import React, { useEffect, useState } from 'react'
import { MenuCategory, RestaurantMenu } from "@/app/types/types";

// Redux Imports
import type { RootState } from '@/app/redux/store'
import {useSelector} from 'react-redux'
import SubcategoryView from "./subcategory";
import MenuNavBar from "./navigation-bar";

export default function MenuHeader(props:{restaurantInfo:RestaurantMenu}) {


  const [pageFolder, setPageFolder] = useState<string|null>(null);
  const [styles, setStyles] = useState<any>(FullscreenStyle);

  useEffect(() => {
    // Get the pathname from window.location
    const pathname = window.location.pathname;
    
    // Extract the folder name from the pathname
    const folderName = pathname.split('/')[1]; // Assuming the folder is the first segment after the domain
    
    if(pageFolder == 'restaurant'){
      setStyles(FullscreenStyle)
    }else{
      setStyles(PreviewStyle)
    }
    setPageFolder(folderName);
  }, [pageFolder]);

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

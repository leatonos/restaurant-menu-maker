"use client"
import Image from "next/image";
import PreviewStyle from "@/app/css/restaurant-view.module.css"
import FullscreenStyle from '@/app/css/restaurant-view-fullscreen.module.css'
import React, { useEffect, useState } from 'react'
import { MenuCategory, MenuStyle, RestaurantMenu } from "@/app/types/types";


// Redux Imports
import type { RootState } from '@/app/redux/store'
import {useSelector} from 'react-redux'
import SubcategoryView from "./subcategory";
import { useAppSelector } from "@/app/redux/hooks";

export default function CategoryView(props:{categoryInfo:MenuCategory, menuStyle: MenuStyle}) {

  const available = props.categoryInfo.available
  const subcategories = props.categoryInfo.subcategories

  const menuStyle = props.menuStyle
  const fontColor = menuStyle.fontColor

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

  // Hides this section of the menu if user decides this is not available
  if(!available){
    return
  }

  return (
    <div className={styles.categoryContainer} style={{backgroundColor:menuStyle.primaryColor}}>
        <div className={styles.categoryDetails} style={{color:fontColor}}>
            <h2 style={{color:fontColor}} className={styles.categoryTitle}>{props.categoryInfo.name}</h2>
            <p style={{color:fontColor}}>{props.categoryInfo.description}</p>
        </div>
        <div className={styles.subcategoriesContainer}>
            {subcategories.map((subcategory, index)=>(
                <SubcategoryView key={index} subcategoryInfo={subcategory} menuStyle={menuStyle} />
            ))}
        </div>
    </div>
  );
}

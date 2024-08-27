"use client"
import Image from "next/image";
import PreviewStyle from "@/app/css/restaurant-view.module.css"
import FullscreenStyle from '@/app/css/restaurant-view-fullscreen.module.css'
import React, { useEffect, useState } from 'react'
import { MenuCategory, MenuStyle, RestaurantMenu, Subcategory } from "@/app/types/types";


// Redux Imports
import type { RootState } from '@/app/redux/store'
import {useSelector} from 'react-redux'
import ItemView from "./item";

export default function SubcategoryView(props:{subcategoryInfo:Subcategory, menuStyle:MenuStyle}) {

  const available = props.subcategoryInfo.available
  const items = props.subcategoryInfo.items

  const menuStyle = props.menuStyle
  const fontColor = menuStyle.fontColor

    
  const [pageFolder, setPageFolder] = useState<string|null>(null);
  const [styles, setStyles] = useState<any>(FullscreenStyle);


  //Makes sure it gets the correct CSS file according to the page
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
    <div id={props.subcategoryInfo.name} className={styles.subcategoryContainer} style={{backgroundColor: menuStyle.secondaryColor}}>
        <div className={styles.subcategoryDetails} style={{color:fontColor}}>
            <h3 style={{color:fontColor}} className={styles.subcategoryTitle}>{props.subcategoryInfo.name}</h3>
            <p style={{color:fontColor}}>{props.subcategoryInfo.description}</p>
        </div>
        <div className={styles.itemsContainer}>
            {items.map((item, index)=>(
                <ItemView key={index} itemInfo={item} menuStyle={menuStyle}/>
            ))}
        </div>
    </div>
  );
}

"use client"
import Image from "next/image";
import PreviewStyle from "@/app/css/restaurant-view.module.css"
import FullscreenStyle from '@/app/css/restaurant-view-fullscreen.module.css'
import React, { useEffect, useState } from 'react'
import { Item, MenuCategory, MenuStyle, RestaurantMenu, Subcategory } from "@/app/types/types";
import { imageExists } from "./imageCheck";

// Redux Imports
import type { RootState } from '@/app/redux/store'
import {useSelector} from 'react-redux'

export default function ItemView(props:{itemInfo:Item, menuStyle:MenuStyle}) {

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

  //Custom Styles
  const menuStyle = props.menuStyle
  const fontColor = menuStyle.fontColor

  const available = props.itemInfo.available
  // Hides this section of the menu if user decides this is not available
  if(!available){
    return
  }

  const formatPrice = (price: number) =>{
    if(isNaN(price as number)){
      return '0.00'
    }else{
      let correct = price as number
      return correct.toFixed(2)
    }
  }



  const ProductImage = (imageProp:{imageURL:string}) =>{

    if(imageProp.imageURL === 'https://placehold.co/100'){
      return <></>
    }
    else{
      return <img src={imageProp.imageURL} width={100} onError={({ currentTarget }) => {currentTarget.style.display = 'none'}}/>
    }
  }

  
  return (
    <div className={styles.itemContainer} style={{color:fontColor}}>
        <div className={styles.itemDetails}>
          <h4 className={styles.itemTitle}>{props.itemInfo.name}</h4>
          <p>{props.itemInfo.description}</p>
          <p>{formatPrice(props.itemInfo.price)}</p>
        </div>
        <div className={styles.itemPhotoContainer}>
          <ProductImage imageURL={props.itemInfo.photoURL}/>
        </div>
    </div>
  );
}

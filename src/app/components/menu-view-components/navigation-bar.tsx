"use client"
import Image from "next/image";
import PreviewStyle from "@/app/css/restaurant-view.module.css"
import FullscreenStyle from '@/app/css/restaurant-view-fullscreen.module.css'
import React, { useEffect, useState } from 'react'
import { MenuCategory, MenuStyle, RestaurantMenu, Subcategory } from "@/app/types/types";


// Redux Imports
import type { RootState } from '@/app/redux/store'
import {useSelector} from 'react-redux'
import SubcategoryView from "./subcategory";
import { useAppSelector } from "@/app/redux/hooks";
import { useRouter } from "next/router";

export default function MenuNavBar(props:{categories:MenuCategory[],navBarStyle:MenuStyle}) {

  const menuStyle = props.navBarStyle
  const fontColor = menuStyle.fontMenuColor
  const categories = props.categories
  const allSubcategories:Subcategory[] = []


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


  
  categories.map((category)=>{
    category.subcategories.map((subcategory)=>{
        allSubcategories.push(subcategory)
    })
  })

  return (
    <nav className={styles.navContainer} style={{backgroundColor:menuStyle.subMenuColor}}>
        <ul className={styles.catList} style={{color:fontColor}}>
            {allSubcategories.map((subcategory, index)=>(
                <li key={index} className={styles.navItem}>
                    <a href={`#${subcategory.name}`}>
                        {subcategory.name}
                    </a>
                </li>
            ))}
        </ul>
    </nav>
  );
}

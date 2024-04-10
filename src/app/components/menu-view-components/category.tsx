"use client"
import Image from "next/image";
import styles from "@/app/css/restaurant-view.module.css"
import React, { useEffect } from 'react'
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

  // Hides this section of the menu if user decides this is not available
  if(!available){
    return
  }

  return (
    <div className={styles.categoryContainer} style={{backgroundColor:menuStyle.primaryColor}}>
        <div className={styles.categoryDetails} style={{color:fontColor}}>
            <h2 className={styles.categoryTitle}>{props.categoryInfo.name}</h2>
            <p>{props.categoryInfo.description}</p>
        </div>
        <div className={styles.subcategoriesContainer}>
            {subcategories.map((subcategory, index)=>(
                <SubcategoryView key={index} subcategoryInfo={subcategory} menuStyle={menuStyle} />
            ))}
        </div>
    </div>
  );
}

"use client"
import Image from "next/image";
import styles from "@/app/css/restaurant-creator-page.module.css"
import { redirect } from  'next/navigation';
import React, { useEffect } from 'react'
import { MenuStyle, RestaurantMenu } from "@/app/types/types";

// Redux Imports
import type { RootState } from '@/app/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { setInitialData } from '@/app/redux/menuCreatorSlice'
import CategoryView from "../menu-view-components/category";
import MenuHeader from "../menu-view-components/menu-header";


export default function MenuPreview(props:{initialData:RestaurantMenu}) {

    const menuInfo = useSelector((state: RootState) => state.restaurantCreator.restaurantMenu)
    const dispatch = useDispatch()
    const menuStyle = menuInfo.menuStyle
    const categories = menuInfo.menuCategories

  return (
    <div className={styles.previewContainer} style={{backgroundColor: menuStyle.backgroundColor}}>
        <h2>Preview</h2>
        <MenuHeader restaurantInfo={menuInfo} />
        <div className={styles.previewCategoryContainer}>
          {categories.map((category,index)=>(
            <CategoryView key={index} categoryInfo={category}/>
          ))}
        </div>
    </div>
  );
}

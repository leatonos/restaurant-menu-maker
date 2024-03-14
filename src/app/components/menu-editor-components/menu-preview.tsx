"use client"
import Image from "next/image";
import styles from "@/app/css/restaurant-creator-page.module.css"
import { redirect } from  'next/navigation';
import React, { useEffect } from 'react'
import { RestaurantMenu } from "@/app/types/types";

// Redux Imports
import type { RootState } from '@/app/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { setInitialData } from '@/app/redux/menuCreatorSlice'
import CategoryView from "../menu-view-components/category";


export default function MenuPreview(props:{initialData:RestaurantMenu}) {

    const menuInfo = useSelector((state: RootState) => state.restaurantCreator.restaurantMenu)
    const dispatch = useDispatch()

    const categories = menuInfo.menuCategories

  return (
    <div className={styles.previewContainer}>
        <h2>Preview</h2>
        <h1>{menuInfo.restaurantName}</h1>
        <div className={styles.previewCategoryContainer}>
          {categories.map((category)=>(
            <CategoryView categoryInfo={category}/>
          ))}
        </div>
    </div>
  );
}

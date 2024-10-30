"use client"
import Image from "next/image";
import styles from "@/app/css/restaurant-creator-page.module.css"
import menuViewStyles from "@/app/css/restaurant-view.module.css"
import { redirect } from  'next/navigation';
import React, { useEffect } from 'react'
import { MenuStyle, RestaurantMenu } from "@/app/types/types";

// Component imports
import CategoryView from "../menu-view-components/category";
import MenuHeader from "../menu-view-components/menu-header";
import SearchIcon from "../menu-view-components/search-icon";
import SearchBar from "../menu-view-components/search-bar"

// Redux Imports
import type { RootState } from '@/app/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { setInitialData } from '@/app/redux/menuCreatorSlice'


export default function MenuPreview(props:{initialData:RestaurantMenu}) {

    const menuInfo = useSelector((state: RootState) => state.restaurantCreator.restaurantMenu)
    const dispatch = useDispatch()
    const menuStyle = menuInfo.menuStyle
    const categories = menuInfo.menuCategories

  return (
    <div className={styles.previewContainer}>
        <h2>Preview</h2>
        <main className={styles.menuPreview}>
          <MenuHeader restaurantInfo={menuInfo} />
          <SearchBar restaurantInfo={menuInfo} version={"Preview"} />
            <div className={menuViewStyles.menuContainer} style={{backgroundColor:menuStyle.backgroundColor}}>
            {categories.map((category,index)=>(
              <CategoryView key={index} categoryInfo={category} menuStyle={menuInfo.menuStyle}/>
            ))}
          </div>
        </main>
    </div>
  );
}

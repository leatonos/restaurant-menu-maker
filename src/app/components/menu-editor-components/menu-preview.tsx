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


export default function MenuPreview(props:{initialData:RestaurantMenu}) {

    const menuInfo = useSelector((state: RootState) => state.restaurantCreator.restaurantMenu)
    const dispatch = useDispatch()

  return (
    <div className={styles.previewContainer}>
        <h2>Preview</h2>
        <p>{JSON.stringify(menuInfo)}</p>
    </div>
  );
}

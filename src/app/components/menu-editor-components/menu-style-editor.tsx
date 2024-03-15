"use client"
import Image from "next/image";
import styles from "@/app/css/restaurant-creator-page.module.css"
import { redirect } from  'next/navigation';
import React, { useEffect, useState } from 'react'

// Redux Imports
import type { RootState } from '@/app/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { setMenuStyle } from '@/app/redux/menuCreatorSlice'
import CategoryEditor from "./category-editor";
import { MenuStyle, RestaurantMenu } from "@/app/types/types";


export default function MenuStyleEditor() {

    const restaurantMenuData = useSelector((state: RootState) => state.restaurantCreator)
    const dispatch = useDispatch()
    const menuStyle = restaurantMenuData.restaurantMenu.menuStyle
  
    const [restaurantLogo,setRestaurantLogo] = useState('')
    const [backgroundColor,setBackgroundColor] = useState('')
    const [menuColor,setMenuColor] = useState('')
    const [subMenuColor,setSubMenuColor] = useState('')
    const [primaryColor,setPrimaryColor] = useState('')
    const [secondaryColor,setSecondaryColor] = useState('')
    const [fontColor,setFontColor] = useState('')
   
    const updatedStyle:MenuStyle = {
        restaurantLogo: restaurantLogo,
        backgroundColor: backgroundColor,
        menuColor: menuColor,
        subMenuColor: subMenuColor,
        primaryColor: primaryColor,
        secondaryColor: secondaryColor,
        fontColor: fontColor
    }


    useEffect(()=>{
        dispatch(setMenuStyle(updatedStyle))
    },[backgroundColor,menuColor,subMenuColor,primaryColor,secondaryColor,fontColor])

  return (
        <div className={styles.restaurantStyleEditor} >
          <h2>Menu Styles</h2>
          <p>{menuStyle.menuColor}</p>
          <p>{JSON.stringify(menuStyle.backgroundColor)}</p>
          <div>
            <label htmlFor="restaurantLogo">Restaurant logo:</label>
            <input 
              type="file"
              onChange={(event)=>setRestaurantLogo(event.target.value)} 
              id="restaurantLogo"
            />
          </div>
          <div>
            <label htmlFor="backgroundColor">Background color:</label>
            <input 
              type="color" 
              value={menuStyle.backgroundColor} 
              onChange={(event)=>setBackgroundColor(event.target.value)} 
              id="backgroundColor"
            />
          </div>
          <div>
            <label htmlFor="menuColor">Menu color:</label>
            <input 
              type="color"
              value={menuStyle.menuColor}
              onChange={(event)=>setMenuColor(event.target.value)} 
              id="menuColor"
            />
          </div>
          <div>
            <label htmlFor="subMenuColor">Submenu color:</label>
            <input 
              type="color" 
              value={menuStyle.subMenuColor} 
              onChange={(event)=>setSubMenuColor(event.target.value)} 
              id="subMenuColor"
            />
          </div>
          <div>
            <label htmlFor="primaryColor">Primary color:</label>
            <input 
              type="color" 
              value={menuStyle.primaryColor} 
              onChange={(event)=>setPrimaryColor(event.target.value)} 
              id="primaryColor"
            />
          </div>
          <div>
            <label htmlFor="secondaryColor">Secondary color:</label>
            <input 
              type="color" 
              value={menuStyle.secondaryColor} 
              onChange={(event)=>setSecondaryColor(event.target.value)} 
              id="secondaryColor"
            />
          </div>
          <div>
            <label htmlFor="fontColor">Font Color:</label>
            <input 
              type="color" 
              value={menuStyle.fontColor} 
              onChange={(event)=>setFontColor(event.target.value)} 
              id="fontColor"
            />
          </div>
        </div>   
  );
}

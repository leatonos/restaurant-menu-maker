"use client"
import styles from "@/app/css/restaurant-creator-page.module.css"
import React, { Suspense, useEffect, useState } from 'react'
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE, MIME_TYPES  } from "@mantine/dropzone";
import { MantineProvider } from '@mantine/core';
import useSWRMutation from "swr/mutation";

// Redux Imports
import type { RootState } from '@/app/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { setMenuStyle,setGalleryChangeReference } from '@/app/redux/menuCreatorSlice'
import CategoryEditor from "./category-editor";
import { MenuStyle, RestaurantMenu } from "@/app/types/types";


export default function MenuStyleEditor(props:{initialStyle:MenuStyle}) {

    const restaurantMenuData = useSelector((state: RootState) => state.restaurantCreator)
    const restaurantLogoState = useSelector((state:RootState)=>state.restaurantCreator.restaurantMenu.menuStyle.restaurantLogo)
    const dispatch = useDispatch()
    const menuStyle = restaurantMenuData.restaurantMenu.menuStyle
  
    const [restaurantLogo,setRestaurantLogo] = useState(props.initialStyle.restaurantLogo)
    const [backgroundColor,setBackgroundColor] = useState(props.initialStyle.backgroundColor)
    const [menuColor,setMenuColor] = useState(props.initialStyle.menuColor)
    const [subMenuColor,setSubMenuColor] = useState(props.initialStyle.subMenuColor)
    const [primaryColor,setPrimaryColor] = useState(props.initialStyle.primaryColor)
    const [secondaryColor,setSecondaryColor] = useState(props.initialStyle.secondaryColor)
    const [fontColor,setFontColor] = useState(props.initialStyle.fontColor)
    const [fontMenuColor,setFontMenuColor] = useState(props.initialStyle.fontColor)
   
    const updatedStyle:MenuStyle = {
        restaurantLogo: restaurantLogoState,
        backgroundColor: backgroundColor,
        menuColor: menuColor,
        subMenuColor: subMenuColor,
        primaryColor: primaryColor,
        secondaryColor: secondaryColor,
        fontColor: fontColor,
        fontMenuColor:fontMenuColor
    }

    const openGallery = () =>{
      dispatch(setGalleryChangeReference("Logo"))
    }

    useEffect(()=>{
        dispatch(setMenuStyle(updatedStyle))
    },[backgroundColor,menuColor,subMenuColor,primaryColor,secondaryColor,fontColor,fontMenuColor])

  return (
        <div className={styles.restaurantStyleEditor} >
          <h2>Menu Styles</h2>
          <div>
            <label htmlFor="restaurantLogo">Restaurant logo:</label>
            <button id="restaurantLogo" onClick={openGallery}>Choose Image</button>
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
          <div>
            <label htmlFor="menufontColor">Menu Font Color:</label>
            <input 
              type="color" 
              value={menuStyle.fontMenuColor} 
              onChange={(event)=>setFontMenuColor(event.target.value)} 
              id="menufontColor"
            />
          </div>
        </div>   
  );
}

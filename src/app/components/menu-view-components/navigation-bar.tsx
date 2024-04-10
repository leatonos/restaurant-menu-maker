"use client"
import Image from "next/image";
import styles from "@/app/css/restaurant-view.module.css"
import React, { useEffect } from 'react'
import { MenuCategory, MenuStyle, RestaurantMenu, Subcategory } from "@/app/types/types";


// Redux Imports
import type { RootState } from '@/app/redux/store'
import {useSelector} from 'react-redux'
import SubcategoryView from "./subcategory";
import { useAppSelector } from "@/app/redux/hooks";

export default function MenuNavBar(props:{categories:MenuCategory[],navBarStyle:MenuStyle}) {

  const menuStyle = props.navBarStyle
  const fontColor = menuStyle.fontMenuColor
  const categories = props.categories
  const allSubcategories:Subcategory[] = []
  
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

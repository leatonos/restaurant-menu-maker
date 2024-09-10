"use client"
import Image from "next/image";
import menuViewStyles from "@/app/css/restaurant-view-fullscreen.module.css"
import { redirect } from  'next/navigation';
import React, { useEffect } from 'react'
import { MenuStyle, RestaurantMenu } from "@/app/types/types";

// Redux Imports
import CategoryView from "./category";
import MenuHeader from "./menu-header";


export default function MenuView(props:{restaurantInfo:RestaurantMenu}) {

    const menuInfo = props.restaurantInfo
    const menuStyle = menuInfo.menuStyle
    const categories = menuInfo.menuCategories
  /*
    useEffect(() => {
      const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
      
      anchors.forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = anchor.getAttribute('href')?.substring(1);
          const targetElement = document.getElementById(targetId || '');
    
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    
      return () => {
        anchors.forEach(anchor => {
          anchor.removeEventListener('click', () => {});
        });
      };
    }, []);
    */

  return (
    <div className={menuViewStyles.menuView} style={{backgroundColor:menuStyle.backgroundColor}}>
          <MenuHeader restaurantInfo={menuInfo} />
          <div className={menuViewStyles.menuContainer} style={{backgroundColor:menuStyle.backgroundColor}}>
            {categories.map((category,index)=>(
              <CategoryView key={index} categoryInfo={category} menuStyle={menuStyle}/>
            ))}
          </div>
    </div>
  )
}

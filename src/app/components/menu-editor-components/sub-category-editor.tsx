"use client"
import Image from "next/image";
import styles from "@/app/css/restaurant-creator-page.module.css"
import { redirect } from  'next/navigation';
import React from 'react'

// Redux Imports
import type { RootState } from '@/app/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '@/app/redux/menuCreatorSlice'
import ItemEditor from "./item-editor";


export default function SubcategoryEditor() {

    const count = useSelector((state: RootState) => state.restaurantCreator.value)
    const dispatch = useDispatch()
  
    const useIncrement = () => {
      dispatch(increment())
    }

    const useDecrement = () => {
      dispatch(decrement())
    }

  return (
    <div className={styles.subcategoryEditorContainer}>
        <div>
            <label>Subcategory name:</label>
            <input type="text"></input>
        </div>
        <div>
            <label>Subcategory Description:</label>
            <input type="text"></input>
        </div>
        <ItemEditor/>
      <button>Create Item</button>
    </div>
  );
}

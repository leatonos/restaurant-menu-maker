"use client"
import Image from "next/image";
import styles from "@/app/css/restaurant-creator-page.module.css"
import { redirect } from  'next/navigation';
import React from 'react'

// Redux Imports
import type { RootState } from '@/app/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '@/app/redux/menuCreatorSlice'
import SubcategoryEditor from "./sub-category-editor";
import ItemEditor from "./item-editor";
import { MenuCategory } from "@/app/types/types";

interface editorProps{
  category:MenuCategory
  index:number
}

export default function CategoryEditor(props: editorProps) {

    const count = useSelector((state: RootState) => state.restaurantCreator)
    const dispatch = useDispatch()
  
    const useIncrement = () => {
      dispatch(increment())
    }

    const useDecrement = () => {
      dispatch(decrement())
    }

  return (
    <div className={styles.categoryEditorContainer}>
        <div>
            <label>Category name:</label>
            <input type="text"></input>
        </div>
        <div>
            <label>Category Description:</label>
            <input type="text"></input>
        </div>
      <SubcategoryEditor/>
      <button>Create Subcategory</button>
    </div>
  );
}

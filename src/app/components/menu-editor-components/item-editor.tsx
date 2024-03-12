"use client"
import Image from "next/image";
import styles from "@/app/css/restaurant-creator-page.module.css"
import { redirect } from  'next/navigation';
import React from 'react'

// Redux Imports
import type { RootState } from '@/app/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '@/app/redux/menuCreatorSlice'


export default function ItemEditor() {

    const count = useSelector((state: RootState) => state.restaurantCreator.value)
    const dispatch = useDispatch()
  
    const useIncrement = () => {
      dispatch(increment())
    }

    const useDecrement = () => {
      dispatch(decrement())
    }

  return (
    <div className={styles.itemEditorContainer}>
      <form>
        <div>
            <label>Item name:</label>
            <input type="text"/>
        </div>
        <div>
            <label>Item Description:</label>
            <input type="text"/>
        </div>
        <div>
            <label>Item price:</label>
            <input type="number"/>
        </div>
      </form>
    </div>
  );
}

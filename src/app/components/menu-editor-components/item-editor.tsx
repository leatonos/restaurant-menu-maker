"use client"
import Image from "next/image";
import styles from "@/app/css/restaurant-creator-page.module.css"
import { redirect } from  'next/navigation';
import React from 'react'

// Redux Imports
import type { RootState } from '@/app/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import {ItemReference, deleteItem} from '@/app/redux/menuCreatorSlice'
import { Item } from "@/app/types/types";

interface itemProps {
  categoryIndex:number
  subcategoryIndex:number
  index:number
  item:Item
}

export default function ItemEditor(props:itemProps) {

  const dispatch = useDispatch()

  function removeItem() {
    const itemReference:ItemReference ={
      itemIndex: props.index,
      subcategoryIndex: props.subcategoryIndex,
      categoryIndex: props.categoryIndex
    }
    dispatch(deleteItem(itemReference))
  }

  return (
    <div className={styles.itemEditorContainer}>
        <button onClick={()=> removeItem()}>Delete item</button>
        <div>
            <label>Item name:</label>
            <input type="text" value={props.item.name}/>
        </div>
        <div>
            <label>Item Description:</label>
            <input type="text" value={props.item.description}/>
        </div>
        <div>
            <label>Item price:</label>
            <input type="number" value={props.item.price}/>
        </div>
        <div>
            <label>Item availability:</label>
        </div>
    </div>
  );
}

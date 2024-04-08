"use client"
import Image from "next/image";
import styles from "@/app/css/restaurant-creator-page.module.css"
import { redirect } from  'next/navigation';
import React from 'react'

// Redux Imports
import type { RootState } from '@/app/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import {ItemReference, deleteItem,setItemName,setItemDescription,setItemAvailalibity,setItemPhoto, ItemChange,setItemPrice, setGalleryChangeReference} from '@/app/redux/menuCreatorSlice'
import { Item } from "@/app/types/types";

//Image imports
import moveImage from '../../../../public/expand-arrows.png'
import closeImage from '../../../../public/close.svg'

interface itemProps {
  categoryIndex:number
  subcategoryIndex:number
  index:number
  item:Item
}

export default function ItemEditor(props:itemProps) {

  const dispatch = useDispatch()
  const itemRef:ItemReference ={
    itemIndex: props.index,
    subcategoryIndex: props.subcategoryIndex,
    categoryIndex: props.categoryIndex
  }
  const removeItem=()=>{
    dispatch(deleteItem(itemRef))
  }

  const changeName = (newName:string)=>{
    const itemChange:ItemChange ={
      itemReference: itemRef,
      change: newName
    }
    dispatch(setItemName(itemChange))
    
  }
  const changeDescription = (newDescription:string)=>{
    const itemChange:ItemChange ={
      itemReference: itemRef,
      change: newDescription
    }
    dispatch(setItemDescription(itemChange))
  }
  const changePrice = (newPrice:number)=>{
    const itemChange:ItemChange ={
      itemReference: itemRef,
      change: newPrice
    }
    dispatch(setItemPrice(itemChange))
  }
  const changeAvailability = (isChecked:boolean)=>{
    const itemChange:ItemChange ={
      itemReference: itemRef,
      change: isChecked
    }
    dispatch(setItemAvailalibity(itemChange))
  }

  return (
    <div className={styles.itemEditorContainer}>
        <div className={styles.optionsContainer}>
          <div className={styles.leftSide}>
          <button className={styles.smallBtn}>
              <Image className={styles.smallIconMove} src={moveImage} alt={"Delete Category"}/>
            </button>
          </div>
          <div className={styles.rightSide}>
            <button onClick={removeItem} className={styles.smallBtn}>
              <Image className={styles.smallIcon} src={closeImage} alt={"Delete Item"}/>
            </button>
          </div>
        </div>
        <div className={styles.itemEditingArea}>
          <div className={styles.itemDetailsEditor}>
            <div>
                <label>Item name:</label>
                <input type="text" onChange={(event)=>changeName(event.target.value)} value={props.item.name}/>
            </div>
            <div>
                <label>Item Description:</label>
                <input type="text" onChange={(event)=>changeDescription(event.target.value)} value={props.item.description}/>
            </div>
            <div>
                <label>Item price:</label>
                <input type="number" min={0} onChange={(event)=>changePrice(parseFloat(event.target.value))} value={props.item.price}/>
            </div>
            <div>
                <label htmlFor="available">Item availability:</label>
                <input
                  id="available"
                  type="checkbox"
                  checked={props.item.available}
                  onChange={(event)=>changeAvailability(event.target.checked)}
                />
            </div>
          </div>
          <div onClick={()=>dispatch(setGalleryChangeReference(itemRef))} className={styles.itemImageEditor}>
            <img src={props.item.photoURL} alt="Image of your menu item" width={100}/>  
          </div>
        </div> 
    </div>
  );
}

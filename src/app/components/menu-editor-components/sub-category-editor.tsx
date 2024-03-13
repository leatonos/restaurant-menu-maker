"use client"
import Image from "next/image";
import styles from "@/app/css/restaurant-creator-page.module.css"
import { redirect } from  'next/navigation';
import React from 'react'

// Redux Imports
import type { RootState } from '@/app/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { SubcategoryReference, deleteSubcategory, createNewItem, ItemReference } from '@/app/redux/menuCreatorSlice'
import ItemEditor from "./item-editor";
import { Subcategory } from "@/app/types/types";


interface editorProps{
  subcategory:Subcategory,
  categoryIndex:number
  index:number,
}

export default function SubcategoryEditor(props:editorProps) {

  const dispatch = useDispatch()

  const deleteSubcat = ()=>{

    const subcategoryReference:SubcategoryReference ={
      categoryIndex: props.categoryIndex,
      subcategoryIndex: props.index
    }

    dispatch(deleteSubcategory(subcategoryReference))
  }

  const addNewItem = () =>{
    const subCatRef:SubcategoryReference = {
      categoryIndex: props.categoryIndex,
      subcategoryIndex: props.index
    }

    dispatch(createNewItem(subCatRef))
  }

  return (
    <div className={styles.subcategoryEditorContainer}>
      <div>
        <button onClick={deleteSubcat}>Delete subcategory</button>
        <div>
            <label>Subcategory name:</label>
            <input type="text"></input>
        </div>
        <div>
            <label>Subcategory Description:</label>
            <input type="text"></input>
        </div>
      </div>
      <div className={styles.itemsContainer}>
        {props.subcategory.items.map((item, index)=>(
          <ItemEditor key={index} categoryIndex={props.categoryIndex} subcategoryIndex={props.index} index={index} item={item} />
        ))}

      </div>
      <button onClick={addNewItem}>Create Item</button>
    </div>
  );
}

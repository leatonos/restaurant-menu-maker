"use client"
import Image from "next/image";
import styles from "@/app/css/restaurant-creator-page.module.css"
import { redirect } from  'next/navigation';
import React from 'react'

// Redux Imports
import type { RootState } from '@/app/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { DeleteSubcategoryInfo, deleteSubcategory } from '@/app/redux/menuCreatorSlice'
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

    const subcategoryReference:DeleteSubcategoryInfo ={
      categoryIndex: props.categoryIndex,
      subcategoryIndex: props.index
    }

    dispatch(deleteSubcategory(subcategoryReference))
  }

  return (
    <div className={styles.subcategoryEditorContainer}>
        <button onClick={deleteSubcat}>Delete subcategory</button>
        <div>
            <label>Subcategory name:</label>
            <input type="text"></input>
        </div>
        <div>
            <label>Subcategory Description:</label>
            <input type="text"></input>
        </div>
      <button>Create Item</button>
    </div>
  );
}

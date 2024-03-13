"use client"
import Image from "next/image";
import styles from "@/app/css/restaurant-creator-page.module.css"
import { redirect } from  'next/navigation';
import React from 'react'

// Redux Imports
import type { RootState } from '@/app/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { deleteCategory,changeCategoryName,changeCategoryDescription, CategoryChange,addNewSubcategory } from '@/app/redux/menuCreatorSlice'
import SubcategoryEditor from "./sub-category-editor";
import { MenuCategory } from "@/app/types/types";

interface editorProps{
  category:MenuCategory
  index:number
}

export default function CategoryEditor(props: editorProps) {
    
    const dispatch = useDispatch()
    
    const changeName =(text:string)=>{

      const change:CategoryChange = {
        text: text,
        index: props.index
      }

      dispatch(changeCategoryName(change))
    }
    const changeDescription = (text:string)=>{

      const change:CategoryChange = {
        text: text,
        index: props.index
      }

      dispatch(changeCategoryDescription(change))
    }


  return (
    <div className={styles.categoryEditorContainer}>
      <button onClick={()=>dispatch(deleteCategory(props.index))}>Delete Category</button>
      <div className={styles.categoryEditor}>
        <div>
            <label>Category name:</label>
            <input type="text" value={props.category.name} onChange={(event)=>changeName(event.target.value)}></input>
        </div>
        <div>
            <label>Category Description:</label>
            <input type="text" value={props.category.description} onChange={(event)=>changeDescription(event.target.value)}></input>
        </div>
      </div>
      <div className={styles.subCategoriesContainer}>
        {props.category.subcategories.map((subcategory,index)=>(
          <SubcategoryEditor key={index} subcategory={subcategory} categoryIndex={props.index} index={index}/>
        ))}
      </div>
      <button onClick={()=>dispatch(addNewSubcategory(props.index))}>Create Subcategory</button>
    </div>
  );
}

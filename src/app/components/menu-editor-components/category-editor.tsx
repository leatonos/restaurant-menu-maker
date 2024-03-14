"use client"
import Image from "next/image";
import styles from "@/app/css/restaurant-creator-page.module.css"
import { redirect } from  'next/navigation';
import React from 'react'

// Redux Imports
import type { RootState } from '@/app/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { deleteCategory,setCategoryName,setCategoryDescription,setCategoryAvailability,
  CategoryChange,createNewSubcategory } from '@/app/redux/menuCreatorSlice'
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
        change: text,
        index: props.index
      }

      dispatch(setCategoryName(change))
    }
    const changeDescription = (text:string)=>{

      const change:CategoryChange = {
        change: text,
        index: props.index
      }

      dispatch(setCategoryDescription(change))
    }
    const changeAvailability = (newStatus: boolean)=>{
      const subCatChange:CategoryChange = {
        change: newStatus,
        index: props.index
      }
  
      dispatch(setCategoryAvailability(subCatChange))
  
    }


  return (
    <div className={styles.categoryEditorContainer}>
      <button onClick={()=>dispatch(deleteCategory(props.index))}>Delete Category</button>
      <div className={styles.categoryEditor}>
        <div>
            <label>Category name:</label>
            <input type="text" defaultValue="Category name" value={props.category.name} onChange={(event)=>changeName(event.target.value)}></input>
        </div>
        <div>
            <label>Category Description:</label>
            <input type="text" value={props.category.description} onChange={(event)=>changeDescription(event.target.value)}></input>
        </div>
        <div>
            <label htmlFor="available">Subcategory availability:</label>
            <input
              id="available"
              type="checkbox"
              checked={props.category.available}
              onChange={(event)=>changeAvailability(event.target.checked)}
            />
      </div>
      </div>
      <div className={styles.subCategoriesContainer}>
        {props.category.subcategories.map((subcategory,index)=>(
          <SubcategoryEditor key={index} subcategory={subcategory} categoryIndex={props.index} index={index}/>
        ))}
      </div>
      <button onClick={()=>dispatch(createNewSubcategory(props.index))}>Create Subcategory</button>
    </div>
  );
}

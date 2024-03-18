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

//Image imports
import AddImage from '../../../../public/add.svg'
import TrashImage from '../../../../public/trash.svg'
import closeImage from '../../../../public/close.svg'
import moveImage from '../../../../public/expand-arrows.png'

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
      <div className={styles.optionsContainer}>
        <div className={styles.leftSide}>
        <button className={styles.smallBtn}>
            <Image className={styles.smallIconMove} src={moveImage} alt={"Move Category"}/>
          </button>
        </div>
        <div className={styles.rightSide}>
          <button onClick={()=>dispatch(deleteCategory(props.index))} className={styles.smallBtn}>
            <Image className={styles.smallIcon} src={closeImage} alt={"Delete Category"}/>
          </button>
        </div>
      </div>
      <div className={styles.categoryEditor}>
        <div>
            <label>Category name:</label>
            <input type="text" value={props.category.name} onChange={(event)=>changeName(event.target.value)}></input>
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
      <div className={styles.createNewBox}>
        <button onClick={()=>dispatch(createNewSubcategory(props.index))} className={styles.createButton}>
          <Image className={styles.createIcon} src={AddImage} alt={"Create new category button"} />
          Create new Subcategory
        </button>
      </div>
    </div>
  );
}
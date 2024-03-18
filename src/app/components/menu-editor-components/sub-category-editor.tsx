"use client"
import Image from "next/image";
import styles from "@/app/css/restaurant-creator-page.module.css"
import { redirect } from  'next/navigation';
import React from 'react'

// Redux Imports
import type { RootState } from '@/app/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { SubcategoryReference, deleteSubcategory,setSubcategoryName,setSubcategoryDescription, createNewItem, SubcategoryChange, setSubcategoryAvailalibity } from '@/app/redux/menuCreatorSlice'
import ItemEditor from "./item-editor";
import { Subcategory } from "@/app/types/types";

//Image imports
import AddImage from '../../../../public/add.svg'
import moveImage from '../../../../public/expand-arrows.png'
import closeImage from '../../../../public/close.svg'

interface editorProps{
  subcategory:Subcategory,
  categoryIndex:number
  index:number,
}

export default function SubcategoryEditor(props:editorProps) {

  const thisSubcategoryRef:SubcategoryReference = {
    categoryIndex: props.categoryIndex,
    subcategoryIndex: props.index
  }
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

  const changeSubcategoryName = (newName: string) =>{
    const subCatChange:SubcategoryChange = {
      subcategoryReference: thisSubcategoryRef,
      change: newName
    }

    dispatch(setSubcategoryName(subCatChange))

  }
  
  const changeSubcategoryDesc = (newDescription: string) =>{
    const subCatChange:SubcategoryChange = {
      subcategoryReference: thisSubcategoryRef,
      change: newDescription
    }

    dispatch(setSubcategoryDescription(subCatChange))

  }

  const changeAvailability = (newStatus: boolean)=>{
    const subCatChange:SubcategoryChange = {
      subcategoryReference: thisSubcategoryRef,
      change: newStatus
    }

    dispatch(setSubcategoryAvailalibity(subCatChange))

  }

  return (
    <div className={styles.subcategoryEditorContainer}>
      <div>
      <div className={styles.optionsContainer}>
        <div className={styles.leftSide}>
        <button className={styles.smallBtn}>
            <Image className={styles.smallIconMove} src={moveImage} alt={"Move subcategory"}/>
          </button>
        </div>
        <div className={styles.rightSide}>
          <button onClick={deleteSubcat} className={styles.smallBtn}>
            <Image className={styles.smallIcon} src={closeImage} alt={"Delete Subategory"}/>
          </button>
        </div>
      </div>
        <div>
            <label>Subcategory name:</label>
            <input type="text" value={props.subcategory.name} onChange={(event)=>changeSubcategoryName(event.target.value)}></input>
        </div>
        <div>
            <label>Subcategory Description:</label>
            <input type="text" value={props.subcategory.description} onChange={(event)=>changeSubcategoryDesc(event.target.value)}></input>
        </div>
      </div>
      <div>
            <label htmlFor="available">Subcategory availability:</label>
            <input
              id="available"
              type="checkbox"
              checked={props.subcategory.available}
              onChange={(event)=>changeAvailability(event.target.checked)}
            />
      </div>
      <div className={styles.itemsContainer}>
        {props.subcategory.items.map((item, index)=>(
          <ItemEditor key={index} categoryIndex={props.categoryIndex} subcategoryIndex={props.index} index={index} item={item} />
        ))}
      </div>
      <div className={styles.createNewBox}>
        <button onClick={addNewItem} className={styles.createButton}>
          <Image className={styles.createIcon} src={AddImage} alt={"Create new category button"} />
          Create new Item
        </button>
      </div>
    </div>
  );
}

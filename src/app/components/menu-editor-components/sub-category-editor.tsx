"use client"
import Image from "next/image";
import styles from "@/app/css/restaurant-creator-page.module.css"
import { redirect } from  'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

// Redux Imports
import type { RootState } from '@/app/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { SubcategoryReference, deleteSubcategory,setSubcategoryName,setSubcategoryDescription, createNewItem, SubcategoryChange, setSubcategoryAvailalibity, moveSubCategory } from '@/app/redux/menuCreatorSlice'
import { setdraggingSubcategoryState } from "@/app/redux/dragNdropSlice";
import ItemEditor from "./item-editor";
import { Subcategory } from "@/app/types/types";

//Image imports
import AddImage from '../../../../public/add.svg'
import moveImage from '../../../../public/drag-icon.svg'
import closeImage from '../../../../public/close.svg'
import minIcon from '../../../../public/minimize.svg'
import maxIcon from '../../../../public/maximize.svg'
import { addSubcategoryPosition, CategoryPos, MousePosition, setMousePosition, SubcategoryPos } from "@/app/redux/dragNdropSlice";
import { getAllCategoryPositions, getAllSubcategoryPositions } from "@/app/utils/getPositions";

interface editorProps{
  subcategory:Subcategory,
  categoryIndex:number
  index:number,
}

export default function SubcategoryEditor(props:editorProps) {

  const [showStatus, setShowing] = useState(true)
  const [isDragging,setDragStatus] = useState<boolean>(false)
  const [subcatPos,setSubcatPos] = useState<number>(0)
  const [catPos,setCatPos] = useState<number>(0)
  const [Xpos,setXpos] = useState<number>(0)
  const [Ypos,setYpos] = useState<number>(0)
  const [allSubcatPositions, setAllSubcatPositions] = useState<SubcategoryPos[]>()
  const [allCategoriesPositions, setAllCategoriesPositions] = useState<CategoryPos[]>()
  const [rectBounds, setRect] = useState<DOMRect>()

  const subCategoryContainerRef = useRef<HTMLDivElement | null>(null)

  const thisSubcategoryPositionRef:SubcategoryReference = {
    categoryIndex: props.categoryIndex,
    subcategoryIndex: props.index
  }

  //If this subcategory is beign dragged changes some CSS properties
  const DraggingStyles:React.CSSProperties = isDragging && Ypos !=0 ? {
    position: 'fixed',
    width:`${rectBounds?.width}px`,
    zIndex:999,
    top:Ypos-25,
    left:Xpos-20,
    }
    : {};
  const DragginBtnStyles:React.CSSProperties = isDragging ? {cursor:'grabbing'}: {cursor:'grab'};
  const GhostStyles:React.CSSProperties = isDragging && Ypos !=0 ? {
    display:"block",
    opacity:0.3,
    width:rectBounds?.width,
    height:rectBounds?.height
  }:{display:'none'};
  
  const dispatch = useDispatch()
  
  // Makes this component aware if any other component is beign dragged
  // There is no use for this yet
  const isDragginAnCategory =  useSelector((state: RootState) => state.dragNdrop.draggingCategory)
  useEffect(()=>{
    if(isDragginAnCategory){
    }
  },[isDragginAnCategory])


  //Everytime you drag this component, it turns on the event listener for the mouse movements, so the component is able to follow the mouse as the user drags it.
  //It also turns off the listener once the user releases the mouse
     useEffect(()=>{
      if(isDragging){
        document.addEventListener('mousemove', getMousePosition)
      }else{
        document.removeEventListener('mousemove', getMousePosition)
      }
      return () => {
        document.removeEventListener('mousemove', getMousePosition);
      };
    },[isDragging])

  const getCurrentCategoryDraggingPosition = (mouseYposition:number) =>{

    let categoryIndex = props.categoryIndex
    if(allCategoriesPositions){
      for(let catPosition of allCategoriesPositions){
        if(mouseYposition <= catPosition.categoryBottomPosition && mouseYposition >= catPosition.categoryTopPosition){
          categoryIndex = catPosition.categoryArrayPosition
        }
      }
    }
    setCatPos(categoryIndex)
    return categoryIndex
  }

  const getCurrentSubcategoryDraggingPosition = (mouseYposition:number) =>{
    let subcategoryIndex = 0
    let i = 0
    const currentCatIndex = props.categoryIndex
    if(allSubcatPositions && allCategoriesPositions){
      for(let subPosition of allSubcatPositions){
        const middleLine = (subPosition.subcategoryTopPosition + subPosition.subcategoryBottomPosition)/2
        // If the mouse is below the middle of this subcategory,
        // assume the user is dragging into the next subcategory
        if(mouseYposition >= middleLine){
          subcategoryIndex = subPosition.subcategoryArrayPosition
        }
        // If user is dragging this item around itself, nothing should change
        if(rectBounds && mouseYposition <= rectBounds.bottom && mouseYposition >= rectBounds.top){
          subcategoryIndex = props.index
        }
        // If dragging the item crosses into a new category,
        // reset the subcategory position to the first subcategory in the new category
        if(mouseYposition > allCategoriesPositions[currentCatIndex].categoryBottomPosition &&
          allSubcatPositions[i].subcategoryArrayPosition == 0 && mouseYposition < middleLine){
          subcategoryIndex = 0
        }
        i++
      }
    }
    setSubcatPos(subcategoryIndex)
    return subcategoryIndex
  }
  
  const getMousePosition = (e:MouseEvent) =>{
    setXpos(e.clientX)
    setYpos(e.clientY)
    const mousePosition:MousePosition = {X:e.clientX,Y:e.clientY}
    dispatch(setMousePosition(mousePosition))
    getCurrentSubcategoryDraggingPosition(e.clientY)
    getCurrentCategoryDraggingPosition(e.clientY)
  }

  const startDraging = async() =>{

    if(subCategoryContainerRef.current){
      setRect(subCategoryContainerRef.current.getBoundingClientRect())
    }
    
    const arrayOfSubcategoryElements = Array.from(document.getElementsByClassName(styles.subcategoryEditorContainer)) as HTMLElement[];
    const arrayOfCategoryElements = Array.from(document.getElementsByClassName(styles.categoryEditorContainer)) as HTMLElement[];

    setDragStatus(true)
    dispatch(setdraggingSubcategoryState(true))
    setAllSubcatPositions(getAllSubcategoryPositions(arrayOfSubcategoryElements))
    setAllCategoriesPositions(getAllCategoryPositions(arrayOfCategoryElements))
  }
  // 
  const stopDraging = ()=>{
    setDragStatus(false)
    const subcategoryDestinyRef:SubcategoryReference ={
      categoryIndex: catPos,
      subcategoryIndex: subcatPos
    }
   
    dispatch(moveSubCategory({
      origin: thisSubcategoryPositionRef,
      destination: subcategoryDestinyRef
    }))
  
    dispatch(setdraggingSubcategoryState(false))
  }


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
      subcategoryReference: thisSubcategoryPositionRef,
      change: newName
    }

    dispatch(setSubcategoryName(subCatChange))

  }
  
  const changeSubcategoryDesc = (newDescription: string) =>{
    const subCatChange:SubcategoryChange = {
      subcategoryReference: thisSubcategoryPositionRef,
      change: newDescription
    }

    dispatch(setSubcategoryDescription(subCatChange))

  }

  const changeAvailability = (newStatus: boolean)=>{

    const subCatChange:SubcategoryChange = {
      subcategoryReference: thisSubcategoryPositionRef,
      change: newStatus
    }

    dispatch(setSubcategoryAvailalibity(subCatChange))

  }

  

  return (
    <>
    <div ref={subCategoryContainerRef} className={styles.subcategoryEditorContainer} style={DraggingStyles}>
      <div>
      <header className={styles.optionsContainer}>
        <div className={styles.leftSide}>
        <button className={styles.smallBtn}>
            <Image className={styles.smallIconMove} style={DragginBtnStyles} src={moveImage} onMouseDown={startDraging} onMouseUp={stopDraging} alt={"Move subcategory"}/>
          </button>
        </div>
        <div className={styles.rightSide}>
          {!showStatus && (
                <button onClick={()=>setShowing(true)} className={styles.smallBtn}>
                <Image className={styles.smallIcon} src={maxIcon} alt={"Maximize"}/>
              </button>
              )}
            {showStatus && (
              <button onClick={()=>setShowing(false)} className={styles.smallBtn}>
              <Image className={styles.smallIcon} src={minIcon} alt={"Minimize"}/>
            </button>
            )}
          <button onClick={deleteSubcat} className={styles.smallBtn}>
            <Image className={styles.smallIcon} src={closeImage} alt={"Delete Subategory"}/>
          </button>
        </div>
      </header>
      <div className={styles.categoryEditor}>
        <div className={styles.editingContainer}>
        <form className={styles.editingDetails}>
          <div>
              <label htmlFor="subcategory-name">Subcategory name:</label>
              <input id="subcategory-name" type="text" defaultValue={props.subcategory.name} onChange={(event)=>changeSubcategoryName(event.target.value)}></input>
          </div>
          
          <div>
              <label htmlFor="subcategory-description">Subcategory Description:</label>
              <input id="subcategory-description" type="text" value={props.subcategory.description} onChange={(event)=>changeSubcategoryDesc(event.target.value)}></input>
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
        </form>
        {!showStatus && (
          <div className={styles.shortInfo}>
            <p>Items: {props.subcategory.items.length}</p>
          </div>
          )}
        </div>
      </div>
      </div>
      {showStatus && (
        <>
          <div className={styles.itemsContainer}>
            {props.subcategory.items.map((item, index)=>(
              <ItemEditor key={item.id} categoryIndex={props.categoryIndex} subcategoryIndex={props.index} index={index} item={item} />
            ))}
          </div>
          <div className={styles.createNewBox}>
            <button onClick={addNewItem} className={styles.createButton}>
              <Image className={styles.createIcon} src={AddImage} alt={"Create new category button"} />
              Create new Item
            </button>
          </div>
        </>
      )}
    </div>
    <div className={styles.subcategoryEditorContainerGhost} style={GhostStyles}>
    </div>
    </>
  );
}

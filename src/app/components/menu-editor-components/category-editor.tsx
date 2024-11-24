"use client"
import Image from "next/image";
import styles from "@/app/css/restaurant-creator-page.module.css"
import { redirect } from  'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

// Redux Imports
import type { RootState } from '@/app/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { deleteCategory,setCategoryName,setCategoryDescription,setCategoryAvailability,
  CategoryChange,createNewSubcategory, 
  moveCategory,
  MovingCategoryReference} from '@/app/redux/menuCreatorSlice'
import SubcategoryEditor from "./sub-category-editor";
import { MenuCategory, Subcategory } from "@/app/types/types";

//Image imports
import AddImage from '../../../../public/add.svg'
import TrashImage from '../../../../public/trash.svg'
import closeImage from '../../../../public/close.svg'
import moveImage from '../../../../public/drag-icon.svg'
import minIcon from '../../../../public/minimize.svg'
import maxIcon from '../../../../public/maximize.svg'
import { CategoryPos, MousePosition, setdraggingCategoryState, setMousePosition } from "@/app/redux/dragNdropSlice";
import { getAllCategoryPositions } from "@/app/utils/getPositions";

interface editorProps{
  category:MenuCategory
  index:number
}

export default function CategoryEditor(props: editorProps) {

    const [showStatus, setShowing] = useState(true)
    const [isDragging,setDragStatus] = useState<boolean>(false)
    const [allCategoriesPositions, setAllCategoriesPositions] = useState<CategoryPos[]>()
    const [Xpos,setXpos] = useState<number>(0)
    const [Ypos,setYpos] = useState<number>(0)
    const [catPos,setCatPos] = useState<number>(0)
    const [rectBounds, setRect] = useState<DOMRect>()

    const categoryContainerRef = useRef<HTMLDivElement | null>(null)

   //If this category is beign dragged changes some CSS properties
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


   //Activates everytime you drag this item
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
    let categoryIndex = 0
    if(allCategoriesPositions){
      for(let catPosition of allCategoriesPositions){
        const middleLine = (catPosition.categoryTopPosition + catPosition.categoryBottomPosition)/2
        // If the mouse is below the middle of this subcategory,
        // assume the user is dragging into the next subcategory
        if(mouseYposition >= middleLine){
          categoryIndex = catPosition.categoryArrayPosition
        }
        // If user is dragging this item around itself, nothing should change
        if(rectBounds && mouseYposition <= rectBounds.bottom && mouseYposition >= rectBounds.top){
          categoryIndex = props.index
        }
      }
    }
    setCatPos(categoryIndex)
    return categoryIndex
  }

  const getMousePosition = (e:MouseEvent) =>{
    setXpos(e.clientX)
    setYpos(e.clientY)
    const mousePosition:MousePosition = {X:e.clientX,Y:e.clientY}
    dispatch(setMousePosition(mousePosition))
    getCurrentCategoryDraggingPosition(e.clientY)
  }
    

  const startDraging = async() =>{

    if(categoryContainerRef.current){
      setRect(categoryContainerRef.current.getBoundingClientRect())
    }
    
    const arrayOfCategoryElements = Array.from(document.getElementsByClassName(styles.categoryEditorContainer)) as HTMLElement[];

    setDragStatus(true)
    dispatch(setdraggingCategoryState(true))
    setAllCategoriesPositions(getAllCategoryPositions(arrayOfCategoryElements))
  }
  // 
  const stopDraging = ()=>{
    setDragStatus(false)
   
    const movingInfo:MovingCategoryReference={
      origin: props.index,
      destination: catPos
    }

    dispatch(moveCategory(movingInfo))
    dispatch(setdraggingCategoryState(false))
  }




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

    const numberOfSubcategories = props.category.subcategories.length
    const numberOfItems = (subcategories:Subcategory[]) => {
      return subcategories.reduce((acc, subcategory) => acc + subcategory.items.length, 0);
    }

  return (
    <> 
    <div ref={categoryContainerRef} className={styles.categoryEditorContainer} style={DraggingStyles}>
      <div className={styles.optionsContainer}>
        <div className={styles.leftSide}>
        <button className={styles.smallBtn}>
            <Image className={styles.smallIconMove} style={DragginBtnStyles} onMouseDown={startDraging} onMouseUp={stopDraging} src={moveImage} alt={"Move Category"}/>
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
          <button onClick={()=>dispatch(deleteCategory(props.index))} className={styles.smallBtn}>
            <Image className={styles.smallIcon} src={closeImage} alt={"Delete Category"}/>
          </button>
        </div>
      </div>
       {/*Category Editor */}
      <div className={styles.categoryEditor}>
        <div className={styles.editingContainer}>
          <form className={styles.editingDetails}>
            <div>
              <label>Category name:</label>
              <input placeholder="Category Name" type="text" value={props.category.name} onChange={(event)=>changeName(event.target.value)}></input>
            </div>
            <div>
              <label>Category Description:</label>
              <input type="text" value={props.category.description} onChange={(event)=>changeDescription(event.target.value)}></input>
            </div>
            <div>
              <label htmlFor="available">Category availability:</label>
              <input
                id="available"
                type="checkbox"
                checked={props.category.available}
                onChange={(event)=>changeAvailability(event.target.checked)}
              />
            </div>
          </form>
          {!showStatus && (
            <div className={styles.shortInfo}>
              <p>Subcategories: {numberOfSubcategories}</p>
              <p>Items: {numberOfItems(props.category.subcategories)}</p>
            </div>
            )}
        </div>
      </div>
     
      {/*SubCategory list */}
      {showStatus && (
          <div>
          <div className={styles.subCategoriesContainer}>
            {props.category.subcategories.map((subcategory,index)=>(
              <SubcategoryEditor key={index+subcategory.name} subcategory={subcategory} categoryIndex={props.index} index={index}/>
            ))}
          </div>
          <div className={styles.createNewBox}>
            <button onClick={()=>dispatch(createNewSubcategory(props.index))} className={styles.createButton}>
              <Image className={styles.createIcon} src={AddImage} alt={"Create new category button"} />
              Create new Subcategory
            </button>
          </div>
          </div>

      )}
     
     </div>
     <div className={styles.categoryEditorContainerGhost} style={GhostStyles}></div>
    </>
  );
}
"use client"
import Image from "next/image";
import styles from "@/app/css/restaurant-creator-page.module.css"
import { redirect } from  'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

// Redux Imports
import type { RootState } from '@/app/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import {ItemReference, deleteItem,setItemName,setItemDescription,setItemAvailalibity,setItemPhoto, ItemChange,setItemPrice, setGalleryChangeReference, moveItem} from '@/app/redux/menuCreatorSlice'
import { addItemPosition, CategoryPos, MousePosition, setCurrentItemArrayPos, setCurrentSubcatArrayPos, setDraggingItemState, setItemsPositions, setMousePosition, SubcategoryPos} from "@/app/redux/dragNdropSlice";
import { Item } from "@/app/types/types";

//Image imports
import moveImage from '../../../../public/drag-icon.svg';
import closeImage from '../../../../public/close.svg';
import deleteImage from "../../../../public/trash.svg";
import { Style } from "util";

//type imports
import { ItemPos } from "@/app/redux/dragNdropSlice";
import { getAllCategoryPositions, getAllItemPositions, getAllSubcategoryPositions } from "@/app/utils/getPositions";

interface itemProps {
  categoryIndex:number
  subcategoryIndex:number
  index:number
  item:Item
}

export default function ItemEditor(props:itemProps) {

  const [itemImage,setItemImage] = useState<string>(props.item.photoURL)
  const [isDragging,setDragStatus] = useState<boolean>(false)
  const [allItemsPositions, setAllItemsPositions] = useState<ItemPos[]>()
  const [allSubcatPositions, setAllSubcatPositions] = useState<SubcategoryPos[]>()
  const [allCategoriesPositions, setAllCategoriesPositions] = useState<CategoryPos[]>()
  const [Xpos,setXpos] = useState<number>(0)
  const [Ypos,setYpos] = useState<number>(0)
  const [itemPos,setItemPos] = useState<number>(0)
  const [subcatPos,setSubcatPos] = useState<number>(0)
  const [catPos,setCatPos] = useState<number>(0)
  const [rectBounds, setRect] = useState<DOMRect>()

  const ItemContainerRef = useRef<HTMLDivElement | null>(null)

  const categories = useSelector((state: RootState) => state.restaurantCreator.restaurantMenu.menuCategories)

  //References to the positions of all the other itens, categories and subcategories

  const dispatch = useDispatch()
  
  //Makes sure to change the image if the image error was fixed
  useEffect(()=>{
    setItemImage(props.item.photoURL)
  },[props.item.photoURL])


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

  //If this Item is beign dragged changes some CSS properties
  const DraggingStyles:React.CSSProperties = isDragging && Ypos !=0 ? {
     position: 'fixed',
     width:`${rectBounds? rectBounds.width : 350}px`,
     zIndex:999,
     top:Ypos-25,
     left:Xpos-20,
     }
    : {};
  
  const GhostStyles:React.CSSProperties = isDragging && Ypos !=0 ? {display:"block",opacity:0.3,width:rectBounds?.width,height:rectBounds?.height}:{display:'none'};
  const DragginBtnStyles:React.CSSProperties = isDragging ? {cursor:'grabbing'}: {cursor:'grab'};
  
  const getCurrentSubcategoryDraggingPosition = (mouseYposition:number) =>{

    let subcategoryIndex = props.subcategoryIndex
    if(allSubcatPositions){
      for(let subPosition of allSubcatPositions){
        if(mouseYposition >= subPosition.subcategoryTopPosition && mouseYposition <= subPosition.subcategoryBottomPosition){
          subcategoryIndex = subPosition.subcategoryArrayPosition
        }
      }
    }

    setSubcatPos(subcategoryIndex)
    return subcategoryIndex
  }

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

  /**
   * Applies position rules for dragging items
   * @param mouseYposition 
   * @returns result position of a dragged item
   */
  
  const getCurrentItemDraggingPosition = (mouseYposition:number)=>{
    let itemIndex = 0
    let i = 0
    const currentSubcatIndex = props.subcategoryIndex
      if(allItemsPositions && allSubcatPositions){
        for( const itemPos of allItemsPositions){
          const itemMiddleLine = (itemPos.itemBottomPosition + itemPos.itemTopPosition)/2
          // If user drags item after the middle of another item this item will come next
          if(mouseYposition >= itemMiddleLine ){
            itemIndex = itemPos.itemArrayPosition + 1
          }
          //If user is dragging this item around itself, nothing should change
          if(rectBounds && mouseYposition <= rectBounds.bottom && mouseYposition >= rectBounds.top){
            itemIndex = props.index
          }
          //If dragging passes to new subcategory makes sure reset the item position counter
          if(mouseYposition > allSubcatPositions[currentSubcatIndex].subcategoryBottomPosition &&
            allItemsPositions[i].itemArrayPosition == 0 && mouseYposition < itemMiddleLine){
            itemIndex = 0
          }
          i++
        }
      }
    setItemPos(itemIndex)
    return itemIndex
  }

  // This triggers everytime you move your mouse while dragging this element
  const getMousePosition = (e:MouseEvent) =>{
    setXpos(e.clientX)
    setYpos(e.clientY)
    const mousePosition:MousePosition = {X:e.clientX,Y:e.clientY}
    dispatch(setMousePosition(mousePosition))
    getCurrentItemDraggingPosition(e.clientY)
    getCurrentSubcategoryDraggingPosition(e.clientY)
    getCurrentCategoryDraggingPosition(e.clientY)
  }

  
  const itemRef:ItemReference ={
    itemIndex: props.index,
    subcategoryIndex: props.subcategoryIndex,
    categoryIndex: props.categoryIndex
  }
  
  //Drag and Drop
  const startDraging = () =>{ 

    const arrayOfItemElements = Array.from(document.getElementsByClassName(styles.itemEditorContainer)) as HTMLElement[];
    console.log(arrayOfItemElements)
    const arrayOfSubcategoryElements = Array.from(document.getElementsByClassName(styles.subcategoryEditorContainer)) as HTMLElement[];
    const arrayOfCategoryElements = Array.from(document.getElementsByClassName(styles.categoryEditorContainer)) as HTMLElement[];

    if(ItemContainerRef.current){
      setRect(ItemContainerRef.current.getBoundingClientRect())
    }
    setDragStatus(true)
    dispatch(setDraggingItemState(true))
    setAllItemsPositions(getAllItemPositions(arrayOfItemElements))
    setAllSubcatPositions(getAllSubcategoryPositions(arrayOfSubcategoryElements))
    setAllCategoriesPositions(getAllCategoryPositions(arrayOfCategoryElements))
  }
  const stopDraging = ()=>{
    setDragStatus(false)
    const itemDestinyRef:ItemReference ={
      itemIndex: itemPos,
      subcategoryIndex: subcatPos,
      categoryIndex: catPos
    }
    if(categories[itemDestinyRef.categoryIndex].subcategories.length < 1){
      console.log('Error Cannot move an item to an empty category')
    }else{
      dispatch(moveItem({
        origin: itemRef,
        destination: itemDestinyRef
      }))
    }
    dispatch(setDraggingItemState(false))
  }


  //Editor Interactions
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
  const removeImage = () =>{

    const itemChange:ItemChange ={
      itemReference: itemRef,
      change: 'https://placehold.co/100x100?text=Select+Image'
    }
    dispatch(setItemPhoto(itemChange))
  }

  return (
    <>
    <div ref={ItemContainerRef} className={styles.itemEditorContainer} style={DraggingStyles}>
        <div className={styles.optionsContainer}>
          <div className={styles.leftSide}>
          <button className={styles.smallBtn}>
              <Image className={styles.smallIconMove} style={DragginBtnStyles} onMouseDown={startDraging} onMouseUp={stopDraging} height={30} src={moveImage} alt={"Move Item"}/>
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
                <label>Item name:</label><br/>
                <input type="text" onChange={(event)=>changeName(event.target.value)} value={props.item.name}/>
            </div>
            <div>
                <label htmlFor={`itemDescription${props.categoryIndex}${props.subcategoryIndex}${props.index}`}>Item Description:</label><br/>
                <textarea rows={4} cols={30} id={`itemDescription${props.categoryIndex}${props.subcategoryIndex}${props.index}`} 
                onChange={(event)=>changeDescription(event.target.value)} value={props.item.description}/>
            </div>
            <div>
                <label>Item price:</label><br/>
                <input type="number" min={0} onChange={(event)=>changePrice(parseFloat(event.target.value))} value={props.item.price}/>
            </div>
            <div>
                <label htmlFor="available">Item availability:</label>
                <input
                  id="available"
                  type="checkbox"
                  defaultChecked={props.item.available}
                  onChange={(event)=>changeAvailability(event.target.checked)}
                />
            </div>
          </div>
          <div className={styles.itemImageEditor}>
              <img src={itemImage} alt="Image of your menu item" width={100} onClick={()=>dispatch(setGalleryChangeReference(itemRef))} onError={() => setItemImage('https://placehold.co/600x400?text=Click+to\nadd+image')}/>
              {itemImage != 'https://placehold.co/100x100?text=Select+Image' && <Image className={styles.itemImageEditorDeleteIcon} src={closeImage} onClick={removeImage} alt={"Remove Image"}/>}
          </div>
        </div> 
    </div>
    
    <div className={styles.itemEditorContainerGhost} style={GhostStyles}>
      
    </div>
    </>
  );
}

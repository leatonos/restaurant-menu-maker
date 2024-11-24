import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Item, MenuCategory, MenuStyle, RestaurantMenu, Subcategory } from '../types/types'
import { access } from 'fs'

export interface CategoryPos {
    categoryArrayPosition:number,
    categoryTopPosition:number,
    categoryBottomPosition:number
}
export interface SubcategoryPos {
    categoryArrayPosition:number,
    subcategoryArrayPosition:number,
    subcategoryTopPosition:number,
    subcategoryBottomPosition:number
}
export interface ItemPos {
    categoryArrayPosition:number,
    subcategoryArrayPosition:number,
    itemArrayPosition:number,
    itemTopPosition:number,
    itemBottomPosition:number
}
export interface MousePosition{
    X:number,
    Y:number
}
interface dragNdropSliceType {
   categoriesPositions:CategoryPos[],
   subCategoriesPositions:SubcategoryPos[],
   itemPositions:ItemPos[],
   draggingCategory:boolean,
   draggingSubcategory:boolean,
   draggingItem:boolean,
   mouse:MousePosition,
   currentPositionCatArrPosition:number
   currentPositionSubcatArrPosition:number
   currentPositionItemArrPosition:number
   
}
const initialState:dragNdropSliceType = {
    categoriesPositions: [],
    subCategoriesPositions: [],
    itemPositions: [],
    draggingCategory: false,
    draggingSubcategory: false,
    draggingItem: false,
    mouse: { X: 0, Y: 0 },
    currentPositionCatArrPosition: 0,
    currentPositionSubcatArrPosition: 0,
    currentPositionItemArrPosition: 0
}
export const dragNdropSlice = createSlice({
  name: 'dragNdrop',
  initialState,
  reducers: {
    //Categories
    setdraggingCategoryState:(state, action: PayloadAction<boolean>)=>{
        state.draggingCategory = action.payload
    },
    setCategoriesPositions:(state, action: PayloadAction<CategoryPos[]>)=>{
        state.categoriesPositions = action.payload
    },
    addCategoryPosition:(state,action:PayloadAction<CategoryPos>)=>{
        state.categoriesPositions.push(action.payload)
    },
    //Subcategories
    setdraggingSubcategoryState:(state, action: PayloadAction<boolean>)=>{
        state.draggingSubcategory = action.payload
    },
    setSubcategoriesPositions:(state, action: PayloadAction<SubcategoryPos[]>)=>{
        state.subCategoriesPositions = action.payload
    },
    addSubcategoryPosition:(state,action:PayloadAction<SubcategoryPos>)=>{
        state.subCategoriesPositions.push(action.payload)
    },
    //Items
    setDraggingItemState:(state, action: PayloadAction<boolean>)=>{
        state.draggingItem = action.payload
    },
    setItemsPositions:(state, action: PayloadAction<ItemPos[]>)=>{
        state.itemPositions = action.payload
    },
    addItemPosition:(state,action:PayloadAction<ItemPos>)=>{
        state.itemPositions.push(action.payload)
    },
    //Positions
    setMousePosition:(state,action:PayloadAction<MousePosition>)=>{
        state.mouse.X = action.payload.X
        state.mouse.Y = action.payload.Y
    },
    setCurrentCatArrayPos:(state,action:PayloadAction<number>)=>{
        state.currentPositionCatArrPosition = action.payload
    },
    setCurrentSubcatArrayPos:(state,action:PayloadAction<number>)=>{
        state.currentPositionSubcatArrPosition = action.payload
    },
    setCurrentItemArrayPos:(state,action:PayloadAction<number>)=>{
        state.currentPositionItemArrPosition = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { setCategoriesPositions, setSubcategoriesPositions, setItemsPositions,
    addItemPosition,addSubcategoryPosition,
    setDraggingItemState,setdraggingSubcategoryState,setdraggingCategoryState,
    setMousePosition,
    setCurrentCatArrayPos,setCurrentSubcatArrayPos,setCurrentItemArrayPos  } = dragNdropSlice.actions

export default dragNdropSlice.reducer
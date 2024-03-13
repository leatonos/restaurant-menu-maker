import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { MenuCategory, RestaurantMenu, Subcategory } from '../types/types'
import { ObjectId } from 'mongodb'

export interface MenuState {
  restaurantMenu:RestaurantMenu
}

export interface CategoryChange{
  text:string
  index:number
}

export interface DeleteSubcategoryInfo{
  categoryIndex:number
  subcategoryIndex:number
}

const initialState: MenuState = {
  restaurantMenu:{
    _id: undefined,
    ownerId: '',
    restaurantName: '',
    restaurantAddress: '',
    menuCategories: []
  }
}

export const menuCreatorSlice = createSlice({
  name: 'restaurantCreator',
  initialState,
  reducers: {
    setInitialData:(state, action: PayloadAction<RestaurantMenu>)=>{
      state.restaurantMenu = action.payload
    },
    createNewCategory: (state) => {
      const newEmptyCategory:MenuCategory = {
        name: '',
        available: true,
        description: '',
        subcategories: []
      }
      state.restaurantMenu.menuCategories.push(newEmptyCategory)
    },
    deleteCategory:(state, action: PayloadAction<number>)=>{
      state.restaurantMenu.menuCategories.splice(action.payload, 1)
    },
    changeCategoryName:(state,action: PayloadAction<CategoryChange>)=>{
      state.restaurantMenu.menuCategories[action.payload.index].name = action.payload.text
    },
    changeCategoryDescription:(state,action: PayloadAction<CategoryChange>)=>{
      state.restaurantMenu.menuCategories[action.payload.index].description = action.payload.text
    },
    addNewSubcategory:(state,action: PayloadAction<number>)=>{
      const newSubcategory:Subcategory = {
        name: '',
        available: true,
        description: '',
        items: []
      }
      state.restaurantMenu.menuCategories[action.payload].subcategories.push(newSubcategory)
    },
    deleteSubcategory:(state,action: PayloadAction<DeleteSubcategoryInfo>)=>{
      const category = state.restaurantMenu.menuCategories[action.payload.categoryIndex]
      const subcategories = category.subcategories
      subcategories.splice(action.payload.subcategoryIndex,1)
    },
    setRestaurantName:(state, action:PayloadAction<string>)=>{
      state.restaurantMenu.restaurantName = action.payload
    },
    setRestaurantAddress:(state, action:PayloadAction<string>)=>{
      state.restaurantMenu.restaurantAddress = action.payload
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      //state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setInitialData, 
   createNewCategory,deleteCategory,changeCategoryName,changeCategoryDescription,
   addNewSubcategory,deleteSubcategory,
   setRestaurantName,setRestaurantAddress } = menuCreatorSlice.actions

export default menuCreatorSlice.reducer
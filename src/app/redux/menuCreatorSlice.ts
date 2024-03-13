import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Item, MenuCategory, RestaurantMenu, Subcategory } from '../types/types'
import { ObjectId } from 'mongodb'

export interface MenuState {
  restaurantMenu:RestaurantMenu
}

export interface CategoryChange{
  text:string
  index:number
}

export interface SubcategoryReference{
  categoryIndex:number
  subcategoryIndex:number
}

export interface ItemReference{
  itemIndex:number
  subcategoryIndex:number
  categoryIndex:number
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
    createNewSubcategory:(state,action: PayloadAction<number>)=>{
      const newSubcategory:Subcategory = {
        name: '',
        available: true,
        description: '',
        items: []
      }
      state.restaurantMenu.menuCategories[action.payload].subcategories.push(newSubcategory)
    },
    deleteSubcategory:(state,action: PayloadAction<SubcategoryReference>)=>{
      const category = state.restaurantMenu.menuCategories[action.payload.categoryIndex]
      const subcategories = category.subcategories
      subcategories.splice(action.payload.subcategoryIndex,1)
    },
    createNewItem:(state,action: PayloadAction<SubcategoryReference>)=>{

      const newItem:Item = {
        name: '',
        available: true,
        description: '',
        photoURL: '',
        price: 0
      }

      const category = state.restaurantMenu.menuCategories[action.payload.categoryIndex]
      const subcategory = category.subcategories[action.payload.subcategoryIndex]
      const itemList = subcategory.items

      itemList.push(newItem)

    },
    deleteItem:(state, action: PayloadAction<ItemReference>)=>{
      const category = state.restaurantMenu.menuCategories[action.payload.categoryIndex]
      const subcategory = category.subcategories[action.payload.subcategoryIndex]
      const itemList = subcategory.items

      itemList.splice(action.payload.itemIndex,1)

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
   createNewSubcategory,deleteSubcategory,
   deleteItem,createNewItem,
   setRestaurantName,setRestaurantAddress } = menuCreatorSlice.actions

export default menuCreatorSlice.reducer
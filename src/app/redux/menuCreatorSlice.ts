import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { MenuCategory, RestaurantMenu } from '../types/types'
import { ObjectId } from 'mongodb'

export interface MenuState {
  restaurantMenu:RestaurantMenu
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
    decrement: (state) => {
      
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
export const { setInitialData, createNewCategory, incrementByAmount,
   setRestaurantName,setRestaurantAddress } = menuCreatorSlice.actions

export default menuCreatorSlice.reducer
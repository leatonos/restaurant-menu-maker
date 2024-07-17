import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Item, MenuCategory, MenuStyle, RestaurantMenu, Subcategory } from '../types/types'
import { access, stat } from 'fs'

const initialState = {
 showCropper:false
}

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    setCropperStatus:(state, action: PayloadAction<boolean>)=>{
      state.showCropper = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setCropperStatus } = gallerySlice.actions

export default gallerySlice.reducer
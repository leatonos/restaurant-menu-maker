import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Item, MenuCategory, MenuStyle, RestaurantMenu, Subcategory } from '../types/types'
import { access, stat } from 'fs'
import { GalleryFile } from '../types/types'
import { Gallery } from '../types/types'

interface gallerySliceType {
    showCropper:boolean;
    gallery:Gallery | undefined
}


const initialState:gallerySliceType = {
 showCropper:false,
 gallery: undefined
}

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    setCropperStatus:(state, action: PayloadAction<boolean>)=>{
      state.showCropper = action.payload
    },
    addGalleryFile:(state, action: PayloadAction<GalleryFile>)=>{
        const thisGallery = state.gallery as Gallery
        thisGallery.files.push(action.payload)
    },
    setGallery:(state, action: PayloadAction<Gallery>)=>{
        state.gallery = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setCropperStatus, addGalleryFile, setGallery  } = gallerySlice.actions

export default gallerySlice.reducer
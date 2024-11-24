import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Item, MenuCategory, MenuStyle, RestaurantMenu, Subcategory } from '../types/types'
import { access, stat } from 'fs'

export interface MenuState {
  restaurantMenu:RestaurantMenu
  galleryState:{
    changeReference:ItemReference | string | undefined
  }
}

export interface CategoryChange{
  change:string | boolean
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

export interface SubcategoryChange{
  subcategoryReference:SubcategoryReference
  change: string | boolean 
}

export interface ItemChange{
  itemReference:ItemReference,
  change:string | boolean | number
}

export interface MovingItemReference{
  origin:ItemReference
  destination:ItemReference
}
export interface MovingSubcategoryReference{
  origin:SubcategoryReference
  destination:SubcategoryReference
}
export interface MovingCategoryReference{
  origin:number
  destination:number
}

const initialState: MenuState = {
  restaurantMenu:{
    _id: undefined,
    ownerId: '',
    restaurantName: '',
    restaurantAddress: '',
    menuCategories: [],
    menuStyle: {
      restaurantLogo: 'https://placehold.co/100',
      backgroundColor: '#ffffff',
      menuColor: '#4A1A1A',
      subMenuColor: '#4A1A1A',
      primaryColor: '#ffffff',
      secondaryColor: '#ffffff',
      fontColor: '#000000',
      fontMenuColor: '#ffffff'
    }
  },
  galleryState:{
    changeReference: undefined
  }
}

export const menuCreatorSlice = createSlice({
  name: 'restaurantCreator',
  initialState,
  reducers: {
    setInitialData:(state, action: PayloadAction<RestaurantMenu>)=>{
      state.restaurantMenu = action.payload
    },
    //Restaurant Info
    setRestaurantName:(state, action:PayloadAction<string>)=>{
      state.restaurantMenu.restaurantName = action.payload
    },
    setRestaurantAddress:(state, action:PayloadAction<string>)=>{
      state.restaurantMenu.restaurantAddress = action.payload
    },
    //Categories
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
    setCategoryName:(state,action: PayloadAction<CategoryChange>)=>{
      state.restaurantMenu.menuCategories[action.payload.index].name = action.payload.change as string
    },
    setCategoryDescription:(state,action: PayloadAction<CategoryChange>)=>{
      state.restaurantMenu.menuCategories[action.payload.index].description = action.payload.change as string
    },
    setCategoryAvailability:(state,action: PayloadAction<CategoryChange>)=>{
      state.restaurantMenu.menuCategories[action.payload.index].available = action.payload.change as boolean
    },
    //Subcategories
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
    setSubcategoryName:(state,action: PayloadAction<SubcategoryChange>)=>{
      const category = state.restaurantMenu.menuCategories[action.payload.subcategoryReference.categoryIndex]
      const subcategory = category.subcategories[action.payload.subcategoryReference.subcategoryIndex]

      subcategory.name = action.payload.change as string
    },
    setSubcategoryDescription:(state,action: PayloadAction<SubcategoryChange>)=>{
      const category = state.restaurantMenu.menuCategories[action.payload.subcategoryReference.categoryIndex]
      const subcategory = category.subcategories[action.payload.subcategoryReference.subcategoryIndex]

      subcategory.description = action.payload.change as string
    },
    setSubcategoryAvailalibity:(state, action: PayloadAction<SubcategoryChange>)=>{

      const subcatRef = action.payload.subcategoryReference

      const category = state.restaurantMenu.menuCategories[subcatRef.categoryIndex]
      const subcategory = category.subcategories[subcatRef.subcategoryIndex]

      subcategory.available = action.payload.change as boolean

    },
    //Items
    createNewItem:(state,action: PayloadAction<SubcategoryReference>)=>{

      const newItem:Item = {
        name: '',
        available: true,
        description: '',
        photoURL: 'https://placehold.co/100x100?text=Select+Image',
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
    setItemName:(state, action: PayloadAction<ItemChange>)=>{

      const itemRef = action.payload.itemReference

      const category = state.restaurantMenu.menuCategories[itemRef.categoryIndex]
      const subcategory = category.subcategories[itemRef.subcategoryIndex]
      const item = subcategory.items[itemRef.itemIndex]

      item.name = action.payload.change as string

    },
    setItemDescription:(state, action: PayloadAction<ItemChange>)=>{

      const itemRef = action.payload.itemReference

      const category = state.restaurantMenu.menuCategories[itemRef.categoryIndex]
      const subcategory = category.subcategories[itemRef.subcategoryIndex]
      const item = subcategory.items[itemRef.itemIndex]

      item.description = action.payload.change as string

    },
    setItemPrice:(state, action: PayloadAction<ItemChange>)=>{

      const itemRef = action.payload.itemReference

      const category = state.restaurantMenu.menuCategories[itemRef.categoryIndex]
      const subcategory = category.subcategories[itemRef.subcategoryIndex]
      const item = subcategory.items[itemRef.itemIndex]

      item.price = action.payload.change as number

    },
    setItemAvailalibity:(state, action: PayloadAction<ItemChange>)=>{

      const itemRef = action.payload.itemReference

      const category = state.restaurantMenu.menuCategories[itemRef.categoryIndex]
      const subcategory = category.subcategories[itemRef.subcategoryIndex]
      const item = subcategory.items[itemRef.itemIndex]

      item.available = action.payload.change as boolean

    },
    setItemPhoto:(state, action: PayloadAction<ItemChange>)=>{

      const itemRef = action.payload.itemReference

      const category = state.restaurantMenu.menuCategories[itemRef.categoryIndex]
      const subcategory = category.subcategories[itemRef.subcategoryIndex]
      const item = subcategory.items[itemRef.itemIndex]

      item.photoURL = action.payload.change as string

    },
    //Colors
    setMenuStyle:(state, action: PayloadAction<MenuStyle>)=>{
      state.restaurantMenu.menuStyle = action.payload
    },
    //Selecting Image Feature
    setGalleryChangeReference:(state, action:PayloadAction<ItemReference | string | undefined>)=>{
      state.galleryState.changeReference = action.payload
    },
    setLogoImage:(state, action:PayloadAction<string>)=>{
      state.restaurantMenu.menuStyle.restaurantLogo = action.payload
    },
    setItemImage:(state, action:PayloadAction<ItemChange>)=>{
      const itemRef = action.payload.itemReference
      
      const category = state.restaurantMenu.menuCategories[itemRef.categoryIndex]
      const subcategory = category.subcategories[itemRef.subcategoryIndex]
      const item = subcategory.items[itemRef.itemIndex]

      item.photoURL = action.payload.change as string
    },
    // Moving Menu Elements
    moveItem:(state,action:PayloadAction<MovingItemReference>)=>{
      const origin = action.payload.origin
      const destiny = action.payload.destination
      
      const itemArrOrigin = state.restaurantMenu.menuCategories[origin.categoryIndex].subcategories[origin.subcategoryIndex].items
      let [transferredItem] = itemArrOrigin.splice(origin.itemIndex, 1);

      const itemArrDestiny = state.restaurantMenu.menuCategories[destiny.categoryIndex].subcategories[destiny.subcategoryIndex].items
      itemArrDestiny.splice(destiny.itemIndex, 0, transferredItem);


    },
    //Moving subcategories
    moveSubCategory:(state,action:PayloadAction<MovingSubcategoryReference>)=>{
      const origin = action.payload.origin
      const destiny = action.payload.destination

      const subcategoryArrOrigin = state.restaurantMenu.menuCategories[origin.categoryIndex].subcategories
      let [transferredSubcategory] = subcategoryArrOrigin.splice(origin.subcategoryIndex,1)

      const subcategoryArrDestiny = state.restaurantMenu.menuCategories[destiny.categoryIndex].subcategories
      subcategoryArrDestiny.splice(destiny.subcategoryIndex,0,transferredSubcategory)


      console.log(subcategoryArrDestiny)

    },
    moveCategory:(state,action:PayloadAction<MovingCategoryReference>)=>{
      const origin = action.payload.origin
      const destiny = action.payload.destination

      const categoryArr = state.restaurantMenu.menuCategories
      let [transferredCategory] = categoryArr.splice(origin,1)

      categoryArr.splice(destiny,0,transferredCategory)
      
    },
  }
})

// Action creators are generated for each case reducer function
export const { setInitialData, 
   createNewCategory,deleteCategory,setCategoryName,setCategoryDescription,setCategoryAvailability,
   createNewSubcategory,deleteSubcategory,setSubcategoryName,setSubcategoryDescription,setSubcategoryAvailalibity,
   deleteItem,createNewItem,setItemName,setItemDescription,setItemAvailalibity,setItemPhoto,setItemPrice,
   setMenuStyle,
   setRestaurantName,setRestaurantAddress,
   setGalleryChangeReference,setLogoImage,setItemImage,
   moveItem,moveSubCategory,moveCategory } = menuCreatorSlice.actions

export default menuCreatorSlice.reducer
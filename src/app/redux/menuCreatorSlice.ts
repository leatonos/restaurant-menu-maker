import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Item, MenuCategory, MenuStyle, RestaurantMenu, Subcategory } from '../types/types'

export interface MenuState {
  restaurantMenu:RestaurantMenu
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
      fontColor: '#000000'
    }
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
        name: 'New Category',
        available: true,
        description: 'A category description (optional)',
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
        name: 'Subcategory',
        available: true,
        description: 'Subcategory description (optional)',
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
        name: 'Food or Beverage name',
        available: true,
        description: 'Food or Beverage description',
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
    }
  }
})

// Action creators are generated for each case reducer function
export const { setInitialData, 
   createNewCategory,deleteCategory,setCategoryName,setCategoryDescription,setCategoryAvailability,
   createNewSubcategory,deleteSubcategory,setSubcategoryName,setSubcategoryDescription,setSubcategoryAvailalibity,
   deleteItem,createNewItem,setItemName,setItemDescription,setItemAvailalibity,setItemPhoto,setItemPrice,
   setMenuStyle,
   setRestaurantName,setRestaurantAddress } = menuCreatorSlice.actions

export default menuCreatorSlice.reducer
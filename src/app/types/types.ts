import { ObjectId } from "mongodb"

export type User ={
    userId: string,
    userName: string,
    menus: RestaurantMenu[]
}

export type RestaurantMenu ={
    _id?:ObjectId,
    ownerId:string,
    restaurantName:string,
    restaurantAddress:string,
    menuCategories: MenuCategory[]
    menuStyle:MenuStyle
}

export type MenuCategory = {
    name: string,
    available: boolean,
    description: string,
    subcategories: Subcategory[]
}

export type Subcategory ={
    name:string,
    available:boolean,
    description: string,
    items: Item[]
}

export type Item = {
    name: string,
    available: boolean,
    description: string,
    photoURL: string,
    price: number
}

export type MenuStyle = {
    restaurantLogo:string,
    backgroundColor:string,
    menuColor:string,
    subMenuColor:string,
    primaryColor:string,
    secondaryColor:string,
    fontColor:string,
    fontMenuColor:string
}

export type Gallery = {
    _id?:ObjectId | string,
    galleryOwner:string,
    files:GalleryFile[]
}

export type GalleryFile = {
    fileId:string,
    fileName:string,
    fileType:string,
    fileSize:number,
    fileURL:string
}
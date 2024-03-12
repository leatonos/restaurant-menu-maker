import { ObjectId } from "mongodb"

export type User ={
    userId: string,
    userName: string,
    menus: RestaurantMenu[]
}

export type RestaurantMenu ={

    _id:ObjectId,
    ownerId:string,
    restaurantName:string,
    restaurantAddress:string,
    menuCategories: MenuCategory[]

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
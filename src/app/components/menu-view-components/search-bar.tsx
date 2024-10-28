"use client"
import Image from "next/image";
import React, { useEffect, useState } from 'react'
import { Item, MenuCategory, RestaurantMenu } from "@/app/types/types";
import SearchIcon from "./search-icon";

export default function SearchBar(props:{restaurantInfo:RestaurantMenu}) {

  const [search, setSearch] = useState<string>('')



  const allItems = props.restaurantInfo.menuCategories.flatMap(category =>
    category.subcategories.flatMap(subcategory => subcategory.items)
  );

  const searchResult = allItems.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))


  const menuStyle = props.restaurantInfo.menuStyle
  
  const ProductImage = (imageProp:{imageURL:string}) =>{

    if(imageProp.imageURL === 'https://placehold.co/100'){
      return <></>
    }
    else{
      return <img className="suggestion-item-img" src={imageProp.imageURL} />
    }
  }

  const formatPrice = (price: number) =>{
    if(isNaN(price as number)){
      return '0.00'
    }else{
      let correct = price as number
      return correct.toFixed(2)
    }
  }

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input style={{backgroundColor:menuStyle.secondaryColor}} onChange={(e)=>setSearch(e.target.value)} value={search} className="search-bar-input" type="text"></input>
        <button type="button" style={{backgroundColor:menuStyle.primaryColor}} className="search-button"><SearchIcon color={menuStyle.fontMenuColor}/></button>
      </div>
        { search != '' &&
        <div className="search-suggestions-container">
            <ul className="suggestion-list">
               {searchResult.map((item,index)=>(
                <a key={`${item.name + index}`} href={`#${item.name}`} onClick={()=>setSearch('')}>
                  <li className="suggestion-item" key={item.name}>
                      <div className="suggestion-item-description">
                          <h4>{item.name}</h4>
                          <h4>{formatPrice(item.price)}</h4>
                      </div>
                      <div className="suggestion-item-img-container">
                        <ProductImage imageURL={item.photoURL}/>
                      </div>
                  </li>
                </a>
               ))}
            </ul>
        </div>
        }
    </div>
  );
}

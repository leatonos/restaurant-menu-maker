'use client'

import React, { useState } from 'react';
import styles from '../../css/restaurant-box.module.css'
import { useUser } from '@auth0/nextjs-auth0/client';
import { deleteRestaurant } from '@/app/server-actions/delete-restaurant';

interface MyProps {
    restaurantId:string;
    restaurantName:string;
}

export default function RestaurantBox( props: MyProps ){
    const { user, error, isLoading } = useUser();
    const {restaurantName, restaurantId} = props

    const [menuDeleted,setDeleted] = useState(false)

    const deleteButton = async(restaurantId: string)=>{
        if(user){
            const deleteResult = await deleteRestaurant(restaurantId, user.sub as string)

            if(deleteResult == "Menu Deleted"){
                setDeleted(true)
            }
        }
    }

    return (
        !menuDeleted &&(
            <div className={styles.boxContainer}>
            <h2>{restaurantName}</h2>
            <a aria-label='Edit Restaurant' href={`user/restaurant-creator/${restaurantId}`}>Edit Restaurant</a>
            <button onClick={()=>deleteButton(restaurantId)}>Delete Restaurant</button>
        </div>
       )
        
    )

}
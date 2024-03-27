'use client'

import React, { useState } from 'react';
import styles from '../../css/restaurant-box.module.css'
import { useUser } from '@auth0/nextjs-auth0/client';
import { deleteRestaurant } from '@/app/server-actions/delete-restaurant';
import Image from 'next/image';
import EditImage from '../../../../public/edit.svg'
import DeleteImage from '../../../../public/trash.svg'

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
            <div className={styles.boxOptions}>
                <button className={styles.boxButton}>
                    <a aria-label='Edit Restaurant' href={`user/restaurant-creator/${restaurantId}`}>
                        <Image src={EditImage} alt={''} />
                        <p>Edit</p>
                    </a>
                </button>
                <button className={styles.boxButton} onClick={()=>deleteButton(restaurantId)}>
                    <Image style={{padding:'5px'}} src={DeleteImage} alt={''}/>
                    <p>Delete</p>
                </button>
            </div>
        </div>
       )
        
    )

}
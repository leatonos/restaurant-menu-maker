'use client'

import React, { useState } from 'react';
import styles from '../../css/userpage.module.css'
import { useUser } from '@auth0/nextjs-auth0/client';
import { deleteRestaurant } from '@/app/server-actions/delete-restaurant';
import Image from 'next/image';
import QRCode from "react-qr-code";
import EditImage from '../../../../public/edit.svg'
import DeleteImage from '../../../../public/trash.svg'
import PreviewImage from '../../../../public/preview.svg'

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
            <div style={{ height: "auto", margin: "0 auto", width: "65%" }}>
                <QRCode
                size={256}
                bgColor={'none'}
                style={{ height: "auto", maxWidth: "180px", width: "100%",padding:'5px' }}
                value={`https://restaurant-menu-maker.vercel.app/restaurant/${restaurantId}`}
                viewBox={`0 0 256 256`}
                />
            </div>
            <div className={styles.boxOptions}>
                <button className={styles.boxButton}>
                    <a aria-label='Preview Restaurant' href={`restaurant/${restaurantId}`}>
                        <Image src={PreviewImage} alt={''} />
                        <p>Preview</p>
                    </a>
                </button>
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
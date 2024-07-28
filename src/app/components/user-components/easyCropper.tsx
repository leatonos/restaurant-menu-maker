'use client'
import React, { useState } from 'react';
import styles from '../../css/userpage.module.css'
import { useUser } from '@auth0/nextjs-auth0/client';
import {Point,Area } from 'react-easy-crop';
import Cropper from 'react-easy-crop';
import Image from 'next/image';

interface MyProps {
    restaurantId:string;
    restaurantName:string;
}

export default function EasyCropper( props: MyProps ){
    const { user, error, isLoading } = useUser();

    const [menuDeleted,setDeleted] = useState(false)

    return (
       <></>
       )
        

}
"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { redirect } from  'next/navigation';
import React from 'react'

// Redux Imports
import type { RootState } from '@/app/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '@/app/redux/menuCreatorSlice'


export default function MenuEditor() {

    const count = useSelector((state: RootState) => state.restaurantCreator.value)
    const dispatch = useDispatch()
  
    const useIncrement = () => {
      dispatch(increment())
    }

    const useDecrement = () => {
      dispatch(decrement())
    }

  return (
    <main>
      <p>{count}</p>
      <button onClick={useIncrement}>+</button>
      <button onClick={useDecrement}>-</button>
    </main>
  );
}

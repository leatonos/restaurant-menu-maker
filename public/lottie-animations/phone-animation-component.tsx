"use client"
//Lottie Import
import Lottie from "lottie-react";
import PhoneAnimation from './Phone_Animationb.json'
import { useState,useEffect, useRef } from 'react';

export default async function PhoneLottieAnimation() {

  return (
      <Lottie 
        animationData={PhoneAnimation}
        style={{width:'100%', maxWidth:'400px'}}
        loop={true}
        />
  );
} 

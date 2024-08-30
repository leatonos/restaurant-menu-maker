"use client"
//Lottie Import
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState,useEffect, useRef } from 'react';

export default async function PhoneLottieAnimation() {

   
  

  return (
        <DotLottieReact
            src='/lottie-animations/Phone_Animation.json'
            autoResizeCanvas={true}
            autoplay
            loop
            mode='bounce'
         />
  );
} 

"use client"
//Lottie Import
import Lottie from "lottie-react";
import DiagramAnimation from './Diagram_Hierarchy.json'
import { useState,useEffect, useRef } from 'react';

export default function DiagramLottieAnimation() {

  return (
      <Lottie 
        animationData={DiagramAnimation}
        style={{width:'100%', maxWidth:'400px'}}
        loop={true}
        />
  );
} 

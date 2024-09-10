'use client'
import styles from '../css/phone-mockup.module.css'
import { useEffect, useRef } from 'react';

interface MyProps {
    menuLink:string
 }
export default async function PhoneMockup(props: MyProps) {


    return (
       
        <div className={styles.phone}>
            <div className={styles.iframeContainer}>
                <iframe src={props.menuLink}></iframe>
            </div>
        </div>
       
        )
  }
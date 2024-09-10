import styles from '../css/phone-mockup.module.css'
import { Suspense } from 'react';

    interface MyProps {
       menuLink:string
    }
export default async function PhoneMockup(props: MyProps) {



    

    return (
       
        <div className="phone">
        <div className="speaker"></div>
        <div className="camera"></div>
        <div className="iframe-container">
          <iframe src={props.menuLink}></iframe>
        </div>
      </div>
       
        )
  }
import styles from '../css/phone-mockup.module.css'
import { Suspense } from 'react';
import { getRestaurant } from '../server-actions/get-restaurant';
import { RestaurantMenu } from '../types/types';

    interface MyProps {
      menuId:string
    }
export default async function PhoneMockup(props: MyProps) {

    const iFrameLink = `https://restaurant-menu-maker.vercel.app/restaurant/${props.menuId}`
    const restaurantInfoRequest = await getRestaurant(props.menuId)
    const restaurantInfo:RestaurantMenu = await restaurantInfoRequest.json()
    const restaurantName = restaurantInfo.restaurantName
    const restaurantImg = restaurantInfo.menuStyle.restaurantLogo

    //https://restaurant-menu-maker.vercel.app/restaurant/66d792507c61318722a589e3

    return (
       
      <div>
        {/* Desktop option */}
        <div className={styles.phone}>
          <div className={styles.speaker}></div>
          <div className={styles.iframeContainer}>
            <iframe src={iFrameLink}></iframe>
          </div>
        </div>
         {/* Mobile option */}
         <a href={iFrameLink} target='_blank'>
          <div className={styles.restaurantCard}>
            <img className={styles.restaurantCardImg} src={restaurantImg}></img>
            <h3>{restaurantName}</h3>
          </div>
         </a>
        
      </div>
     
       
        )
  }
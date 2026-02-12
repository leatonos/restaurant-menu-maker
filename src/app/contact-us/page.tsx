import Image from "next/image";
import styles from "../page.module.css";
import { useUser } from '@auth0/nextjs-auth0/client';
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from  'next/navigation';
import HomeHeader from "../components/home-page-header";

//Images imports
import MainLogo from "../../../public/logos/Menu Factory - Horizontal.svg"

//Lottie Import
import PhoneLottieAnimation from "../../../public/lottie-animations/phone-animation-component";
import DiagramLottieAnimation from "../../../public/lottie-animations/diagram-animation-component";
import Footer from "../components/footer";


export default async function ContactUs() {

  return (
    <main>
      <HomeHeader/>
      <div className={styles.mainContainer}>
        <div className={styles.mainWrapper}>
          <section className={styles.verticalContainer}>
            <div className={styles.titleBox}>
              <h1>I am so glad you want to talk</h1>
            </div>
            <div className={styles.buttonOptions}>
              <button className="primary-btn">
                <a href="/api/auth/login" className="bold-font" >Create account</a>
              </button>
              <button className="secondary-btn">
                <a href="/api/auth/login" className="bold-font" >Learn More</a>
              </button>
            </div>
          </section>
          <section className={styles.horizontalContainer}>  
              <div className="white-text-box">
                <h2 className='subTitle orange-text'>I am </h2>
                <p>Menu factory is a easy to use and simple platform where you can create an online menu for your business like bars, and restaurants.
                  But you are also free to use your imagination and creativity to other use cases.</p>
                <br></br>
                <p>Once you created your menu, you can share with your customers using QR codes, tablets and any other screen to showcase your products.</p>
                <br></br>
                <p>Feel free to change prices, descriptions, names and photos of your products as many times as you want without need to reprint your menu over and over</p>
              </div>
              <div className={styles.animationBox}>
                <PhoneLottieAnimation/>
              </div>
          </section>
          <section className={styles.horizontalContainer}>
          <div className='white-text-box'>
                <h3 className='subTitle orange-text'>How does it work?</h3>
                <p>After you <span><a href="/api/auth/login?prompt=login&screen_hint=signup" className="bold-font orange-text"> create your account </a></span> 
                you can start building your first menu and edit it.</p>
                <br></br>
                <p>Customize the colors and logo of your menu and then start adding products. To add products you must organize them inside categories and subcategories</p>
                <br></br>
                <p>This hierarchy help your guests or customers to navigate through your menu, and quickly find products they are looking for.</p>
                <br></br>
                <p>After you are finished save your work and share with everyone!</p>
              </div>
              <div className={styles.animationBox}>
                <DiagramLottieAnimation/>
              </div>
             
          </section>
        </div>
      </div>
      <Footer/>
    </main>
  );
}

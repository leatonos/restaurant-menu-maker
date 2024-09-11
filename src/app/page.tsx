import Image from "next/image";
import styles from "./page.module.css";
import { useUser } from '@auth0/nextjs-auth0/client';
import ProfileClient from "./components/user-components/userInfo";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from  'next/navigation';
import HomeHeader from "./components/home-page-header";

//Images imports
import MainLogo from "../../public/logos/Menu Factory - Horizontal.svg"
import AppImage from "../../public/about-images/app-image-one.svg"

//Lottie Import
import PhoneLottieAnimation from "../../public/lottie-animations/phone-animation-component";
import DiagramLottieAnimation from "../../public/lottie-animations/diagram-animation-component";
import PhoneMockup from "./components/phone-mockup";


export default async function Home() {


  const session = await getSession();
  let user = null
  
  if(session){
    user = session.user
  }

  if(user){
   return redirect('/user')
  }



  return (
    <main>
      <HomeHeader/>
      <div className={styles.mainContainer}>
        <div className={styles.mainWrapper}>
          <section className={styles.verticalContainer}>
            <div className={styles.logoBox}>
              <Image src={MainLogo} className={styles.mainLogo} alt={""}/>
            </div>
            <div className={styles.titleBox}>
              <h1>Create online and responsive menus for free</h1>
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
              <div className="white-text-box orange-text">
                <h2 className='subTitle orange-text'>What is menu Factory</h2>
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
            <div>
                <h2 className='subTitle orange-text'>How does it look like</h2>
                <p>Here you can see how a menu factory menu look like, feel free to 
                <span><a href="/api/auth/login?prompt=login&screen_hint=signup" className="orange-text bold-font"> create your account </a></span>
                and start testing how your menu will look like
                </p>
            </div>
            <div className={styles.animationBox}>
              <PhoneMockup menuId="66d792507c61318722a589e3"/>
            </div>
          </section>
          <section className={styles.horizontalContainer}>  
              <div className='orange-text-box white-text'>
                <h3 className='subTitle yellow-text'>How does it work?</h3>
                <p>After you <span><a href="/api/auth/login?prompt=login&screen_hint=signup" className="bold-font"> create your account </a></span> 
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
    </main>
  );
}

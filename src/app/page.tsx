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


export default async function Home() {


  const session = await getSession();
  
  const user = session?.user

  if(user){
   return redirect('/user')
  }



  return (
    <main>
      <HomeHeader/>
      <div className={styles.mainContainer}>
        <div className={styles.mainWrapper}>
          <section className={styles.firstContainer}>
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
          <section>
           
            <div className={styles.aboutContainer}>
              <div className={styles.textBox}>
                <h2>How does it work?</h2>
                <p>Create online and responsive menus for free, 
                  using our menu editor you can organize your menu items by category and subcategory. </p>
                <p>Each item may have name, description a price and a photo.</p>
              </div>
              <div className={styles.animationBox}>
                <PhoneLottieAnimation/>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

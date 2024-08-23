import Image from "next/image";
import styles from "./page.module.css";
import { useUser } from '@auth0/nextjs-auth0/client';
import ProfileClient from "./components/user-components/userInfo";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from  'next/navigation';
import HomeHeader from "./components/home-page-header";

//Images imports
import MainLogo from "../../public/logos/Menu Factory - Horizontal.svg"

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
        <section className={styles.firstContainer}>
          <div className={styles.titleBox}>
            <h1>Restaurant Menu Maker is a free platform <br/>to create online and responsive menus for your restaurant</h1>
          </div>
          <div className={styles.logoBox}>
            <Image src={MainLogo} className={styles.mainLogo} alt={""}/>
          </div>
        </section>
      </div>
    </main>
  );
}

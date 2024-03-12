import Image from "next/image";
import styles from "./page.module.css";
import { useUser } from '@auth0/nextjs-auth0/client';
import ProfileClient from "./components/user-components/userInfo";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from  'next/navigation';
import HomeHeader from "./components/home-page-header";

export default async function Home() {

  const session = await getSession();
  
  const user = session?.user

  if(user){
   return redirect('/user')
  }


  return (
    <main>
      <HomeHeader/>
      <h1>Homepage</h1>
      <a href="/api/auth/login">Login</a><br></br>
    </main>
  );
}

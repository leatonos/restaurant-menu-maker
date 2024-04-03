import Image from "next/image";
import styles from "@/app/css/userpage.module.css";
import { useUser } from '@auth0/nextjs-auth0/client';
import ProfileClient from "@/app/components/user-components/userInfo";
import { Session, getSession } from "@auth0/nextjs-auth0";
import { redirect } from  'next/navigation';
import UserHeader from "@/app/components/user-components/user-header";
import { Key, Suspense } from "react";
import { ObjectId } from "mongodb";
import AddImage from '../../../public/addWhite.svg'
import UserGallery from "@/app/components/user-components/user-gallery";

export default async function GalleryPage() {

  const session = await getSession() as Session
  const user = session.user
  
  if(!user){
    redirect('/')
  }

  return (
    <main>
      <UserHeader/>
      <h1 style={{color:"white"}}>Gallery</h1>
      <div className={styles.galleryPageContainer}>
       <UserGallery ownerId={user.sub} />
      </div>
    </main>
  );
}

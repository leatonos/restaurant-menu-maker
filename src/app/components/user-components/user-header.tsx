'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import styles from '../../css/headers.module.css'
import Image from 'next/image';
import genericProfileImage from '../../../../public/generic-user.svg'

export default function UserHeader() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
        <header className={styles.userHeader}>
        <div className={styles.menu}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}><a href="/user" className={styles.menuLink}>My menus</a></li>
            <li className={styles.menuItem}><a href="/user/gallery" className={styles.menuLink}>Gallery</a></li>
            <li className={styles.menuItem}><a href="/api/auth/logout" className={styles.menuLink}>Logoff</a></li>
          </ul>
        </div>
        <div className={styles.profile}>
            <img src={user.picture as string} className={styles.profileImage}></img>
        </div>
      </header>
    )
  );
}
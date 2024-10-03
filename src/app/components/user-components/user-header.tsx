'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import styles from '../../css/headers.module.css'
import Image from 'next/image';
import genericProfileImage from '../../../../public/generic-user.svg'
import { useState } from 'react';

export default function UserHeader() {
  
  const [isOpen, setIsOpen] = useState(false);
  const { user, error, isLoading } = useUser();



  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;



  const toggleMenu = () => {
      setIsOpen(!isOpen);
  };

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
        <nav className={styles.mobileNavbar}>
            <div className={styles.profileMobile}>
              <img src={user.picture as string} className={styles.profileImage}></img>
            </div>
            <ul className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
                <li><a className={styles.mobileItem} href="/user">My menus</a></li>
                <li><a className={styles.mobileItem} href="/user/gallery">Gallery</a></li>
                <li><a className={styles.mobileItem} href="/api/auth/logout">Logoff</a></li>
                <li style={{marginTop:'2em'}}><a className={styles.mobileItemLogin} href="/api/auth/login">Delete Account</a></li>
            </ul>
            <div className={styles.hamburger} onClick={toggleMenu}>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
            </div>
        </nav>
      </header>
    )
  );
}
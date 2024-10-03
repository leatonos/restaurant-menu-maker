'use client'
import { useState } from 'react';
import styles from '../css/headers.module.css'
import Image from 'next/image';

export default function HomeHeader() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

  return (
    <header className={styles.homeHeader}>
       
            <div className={styles.menu}>
                <ul className={styles.menuList}>
                    <li className={styles.menuItem}><a href="#" className={styles.menuLink}>About</a></li>
                    <li className={styles.menuItem}><a href="#" className={styles.menuLink}>Contact us</a></li>
                </ul>
            </div>
            <div className={styles.menu}>
                <ul className={styles.menuList}>
                    <li className={styles.menuItem}><a href="/api/auth/login" className={styles.menuLink}>Login / Create account</a></li>
                </ul>
            </div>
       
        <nav className={styles.mobileNavbar}>
            <div className={styles.logo}>My Website</div>
                <ul className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
                    <li><a className={styles.mobileItem} href="#">Home</a></li>
                    <li><a className={styles.mobileItem} href="#">About</a></li>
                    <li><a className={styles.mobileItem} href="#">Services</a></li>
                    <li><a className={styles.mobileItem} href="#">Contact</a></li>
                    <li style={{marginTop:'2em'}}><a className={styles.mobileItemLogin} href="/api/auth/login">Login / Create account</a></li>
                </ul>
            <div className={styles.hamburger} onClick={toggleMenu}>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
            </div>
        </nav>
       
    </header>
  );
}
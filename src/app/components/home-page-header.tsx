import styles from '../css/headers.module.css'
import Image from 'next/image';

export default function HomeHeader() {

  return (
    <header className={styles.homeHeader}>
        <div className={styles.menu}>
            <ul className={styles.menuList}>
                <li className={styles.menuItem}><a href="/user" className={styles.menuLink}>About</a></li>
                <li className={styles.menuItem}><a href="/user" className={styles.menuLink}>About</a></li>
            </ul>
        </div>
        <div className={styles.menu}>
            <ul className={styles.menuList}>
                <li className={styles.menuItem}><a href="/api/auth/login" className={styles.menuLink}>Login / Create account</a></li>
            </ul>
        </div>
    </header>
  );
}
import styles from '../css/footers.module.css'
import Image from 'next/image';

export default function Footer() {

  return (
    <footer className={styles.footer}>
    <div className={styles.footerContainer}>
      <div className={styles.footerAbout}>
        <h3>About Us</h3>
        <p>Menu Factory is an online platform created to simplify the creation of digital menus</p>
      </div>
      <div className={styles.footerLinks}>
        <h3>Quick Links</h3>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      <div className={styles.footerSocial}>
        <h3>Follow Us</h3>
        <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
        <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
        <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
        <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
      </div>
    </div>
    <div className={styles.footerBottom}>
      <p>&copy; 2024 Menu Factory. All rights reserved.</p>
    </div>
  </footer>

  );
}
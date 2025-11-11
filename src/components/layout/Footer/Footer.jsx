import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.section}>
          <h3>PharmaCare</h3>
          <p>Your trusted online source for essential medicines and healthcare products.</p>
        </div>
        <div className={styles.section}>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/catalog">Medicine Catalog</a></li>
            <li><a href="/profile">My Account</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
        <div className={styles.section}>
          <h4>Contact</h4>
          <p>Email: support@pharmacare.com</p>
          <p>Phone: +1 800-PHARMA</p>
        </div>
      </div>
      <div className={styles.copyright}>
        &copy; {new Date().getFullYear()} PharmaCare. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
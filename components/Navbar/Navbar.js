'use client';

import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  let lastScrollY = 0;

  const disableScroll = () => {
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.height = '100%';
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
  };

  const enableScroll = () => {
    document.documentElement.style.overflow = '';
    document.documentElement.style.height = '';
    document.body.style.overflow = '';
    document.body.style.height = '';
    document.body.style.position = '';
    document.body.style.width = '';
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      if (!prev) {
        disableScroll();
      } else {
        enableScroll();
      }
      return !prev;
    });
  };

  useEffect(() => {
    return () => {
      enableScroll();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80 && window.scrollY > lastScrollY) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header className={`${styles.navbar} ${hidden ? styles.hidden : ''}`}>
        <div className={styles.container}>
          <Link href='/' className={styles.logo}>
            La Fabrique
          </Link>
          <button className={styles.hamburger} onClick={toggleMenu}>
            <Image
              src='/icons/menuicon.webp'
              alt='Menu'
              width={30}
              height={30}
            />
          </button>
        </div>

        <nav className={`${styles.menu} ${menuOpen ? styles.open : ''}`}>
          <div>X</div>
          <ul>
            <li className={styles.menuItem}>
              <Link href='#'>Home</Link>
            </li>
            <li className={styles.menuItem}>
              <Link href='#'>ett</Link>
            </li>
            <li className={styles.menuItem}>
              <Link href='#'>två</Link>
            </li>
            <li className={styles.menuItem}>
              <Link href='#'>tre</Link>
            </li>
          </ul>
        </nav>

        {menuOpen && (
          <div className={styles.overlay} onClick={toggleMenu}></div>
        )}
        <div className={styles.line}></div>
      </header>
    </>
  );
}

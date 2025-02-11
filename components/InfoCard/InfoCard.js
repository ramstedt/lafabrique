'use client';
import Image from 'next/image';
import styles from './InfoCard.module.css';
import { useEffect, useState } from 'react';

export default function InfoCard({ image, alt, title, content }) {
  const borders = [styles.border1, styles.border2, styles.border3];

  // State to store a random border class
  const [border, setBorder] = useState('');

  useEffect(() => {
    // Assign border only on client side
    setBorder(borders[Math.floor(Math.random() * borders.length)]);
  }, []); // Runs only once after mounting
  return (
    <div className={styles.container}>
      <div className={styles.spaceAround}>
        <div className={`${styles.imageWrapper} ${border || ''}`}>
          <Image
            src={image}
            alt={alt}
            fill
            sizes='290px'
            className={styles.image}
          />
        </div>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.content}>{content}</div>
      </div>
    </div>
  );
}

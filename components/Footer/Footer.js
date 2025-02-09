'use client';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer({}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.div10}></div>
      <div className={styles.div2}></div>
      <div className={styles.circle}>
        {' '}
        <svg viewBox='0 0 200 200' className={styles.svgText}>
          <defs>
            <path
              id='circlePath'
              d='M 100, 100
               m -80, 0
               a 80,80 0 1,1 160,0
               a 80,80 0 1,1 -160,0'
            />
          </defs>
          <text fill='#fbf8ef' className={styles.text}>
            <textPath href='#circlePath' startOffset='50%' textAnchor='middle'>
              LA FABRIQUE
            </textPath>
          </text>
        </svg>
      </div>
      <div className={styles.div4}></div>
      <div className={styles.div3}>
        {/* Karl Johansgatan 152
        <br />
        414 50 Göteborg */}
      </div>
      <div className={styles.div6}></div>
      <div className={styles.div7}></div>
      <div className={styles.div8}>hej</div>
    </div>
  );
}

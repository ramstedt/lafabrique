'use client';
import styles from './Footer.module.css';
import { Special_Elite } from 'next/font/google';
import {
  RiInstagramFill,
  RiPhoneFill,
  RiMapPinFill,
  RiMailFill,
  RiTimeFill,
} from 'react-icons/ri';

const specialElite = Special_Elite({
  subsets: ['latin'],
  weight: '400',
});

export default function Footer({}) {
  return (
    <footer className={`${styles.wrapper} ${specialElite.className}`}>
      <div className={styles.div10}></div>
      <div className={styles.div2}></div>
      <div className={styles.circle}>
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
      <div className={styles.div3}></div>
      <div className={styles.div6}>
        <h3>Kontakt</h3>
        <div className={styles.contactWrapper}>
          <div className={styles.addressIcon}>
            <RiMapPinFill />
          </div>
          <div className={styles.addressOne}>Karl Johansgatan 152</div>

          <div className={styles.addressTwo}>
            414 50 Göteborg <br />
          </div>
          <div className={styles.phoneIcon}>
            <RiPhoneFill />
          </div>
          <div className={styles.phone}> 0762486022 </div>
          <div className={styles.emailIcon}>
            <RiMailFill />
          </div>
          <div className={styles.email}> liljakurser@gmail.com </div>
          <div className={styles.openingHoursIcon}>
            <RiTimeFill />
          </div>
          <div className={styles.openingHours}> Måndag-Fredag 10-14</div>
          <div className={styles.socials}>
            <RiInstagramFill />
          </div>
        </div>
      </div>
      <div className={styles.div7}>
        <div>
          <iframe
            width='300'
            height='300'
            src='https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Karl%20Johansgatan%20152+(La%20Fabrique)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'
          ></iframe>
        </div>
      </div>
      <div className={styles.div8}>
        Karl Johansgatan 152
        <br />
        414 50 Göteborg
      </div>
    </footer>
  );
}

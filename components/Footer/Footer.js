'use client';
import styles from './Footer.module.css';
import { Special_Elite } from 'next/font/google';
import Link from 'next/link';
import {
  RiInstagramFill,
  RiPhoneFill,
  RiMapPinFill,
  RiMailFill,
  RiTimeFill,
  RiFacebookCircleFill,
} from 'react-icons/ri';

const specialElite = Special_Elite({
  subsets: ['latin'],
  weight: '400',
});

export default function Footer({ data }) {
  return (
    <footer className={`${styles.wrapper} ${specialElite.className}`}>
      <div className={styles.div10}></div>
      <div className={styles.div2}></div>
      <div className={styles.circle}>
        <svg viewBox="0 0 200 200" className={styles.svgText}>
          <defs>
            <path
              id="circlePath"
              d="M 100, 100
               m -80, 0
               a 80,80 0 1,1 160,0
               a 80,80 0 1,1 -160,0"
            />
          </defs>
          <text fill="#fbf8ef" className={styles.text}>
            <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
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
          {data.address1 && (
            <>
              <div className={styles.addressIcon}>
                <RiMapPinFill />
              </div>
              <div className={styles.addressOne}>{data.address1}</div>
            </>
          )}
          {data.address2 && (
            <>
              <div className={styles.addressTwo}>{data.address2}</div>
            </>
          )}
          {data.phone && (
            <>
              <div className={styles.phoneIcon}>
                <RiPhoneFill />
              </div>
              <div className={styles.phone}>
                <Link href={`tel:${data.phone}`}>{data.phone}</Link>
              </div>
            </>
          )}
          {data.email && (
            <>
              <div className={styles.emailIcon}>
                <RiMailFill />
              </div>
              <div className={styles.email}>
                <Link href={`mailto:${data.email}`}>{data.email}</Link>
              </div>
            </>
          )}
          {data.openingHours && (
            <>
              <div className={styles.openingHoursIcon}>
                <RiTimeFill />
              </div>
              <div className={styles.openingHours}>{data.openingHours}</div>
            </>
          )}

          <div className={styles.socials}>
            <div className={styles.socialsHeader}>
              {' '}
              <h3>Följ oss på sociala medier</h3>
            </div>
            {data.instagram && (
              <Link href={data.instagram} target="_blank">
                <RiInstagramFill />
              </Link>
            )}
            {data.facebook && (
              <Link href={data.facebook} target="_blank">
                <RiFacebookCircleFill />
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className={styles.div7}>
        <div>
          <iframe
            width="300"
            height="300"
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Karl%20Johansgatan%20152+(La%20Fabrique)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
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

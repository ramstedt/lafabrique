'use client';
import Image from 'next/image';
import styles from './Herocard.module.css';
import SecondaryButton from '@/components/_Atoms/SecondaryButton/SecondaryButton';
import { Autour_One } from 'next/font/google';

const autorOne = Autour_One({ subsets: ['latin'], weight: '400' });

export default function HeroCard({
  buttonText,
  textOne,
  textTwo,
  mediaUrl,
  altText,
  url,
}) {
  const regex = /^\/videos/;
  const isVideo = typeof mediaUrl === 'string' && regex.test(mediaUrl);
  return (
    <div className={styles.wrapper}>
      {isVideo ? (
        <video src={mediaUrl} autoPlay muted playsInline loop></video>
      ) : (
        <Image
          alt={altText}
          src={mediaUrl}
          fill
          priority={true}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      )}
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <div className={`${styles.text} ${autorOne.className}`}>
            {textOne}
          </div>
          <div className={`${styles.title} ${autorOne.className}`}>
            {textTwo}
          </div>
          {url.length > 2 && (
            <div>
              <SecondaryButton buttonText={buttonText} url={url} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

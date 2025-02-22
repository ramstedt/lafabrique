'use client';
import Link from 'next/link';
import styles from './ArtistCard.module.css';
import Image from 'next/image';
import { Dawning_of_a_New_Day } from 'next/font/google';

const dawning = Dawning_of_a_New_Day({
  subsets: ['latin'],
  weight: '400',
});

export default function ArtistCard({}) {
  return (
    <>
      <div className={`${styles.wrapper1} ${styles.wrapper}`}>
        <div className={`${styles.title1} ${styles.title}`}>
          <div className={`${styles.name} ${dawning.className}`}>
            Karin
            <br />
            <span className={styles.surname}>Lilja</span>
          </div>
          <Image src='/images/karinplaceholder.jpg' alt='' fill />
        </div>
        <div className={`${styles.socials1} ${styles.socials}`}>
          Kontaktinfo / sociala medier här <br />
        </div>
        <div className={`${styles.text1} ${styles.text}`}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
          alias impedit voluptate asperiores culpa quo, reprehenderit nemo
          accusantium tempore iusto dolore expedita minima placeat, officiis est
          sequi accusamus debitis earum? Perferendis labore nostrum porro saepe
          mollitia natus unde a, doloremque nesciunt iusto repellat dicta
          consequuntur sequi sit veniam quasi distinctio. Ut officia accusantium
          in, perspiciatis repellendus saepe quo reiciendis veritatis! Laborum
          maxime cum odit. Quisquam modi ea, excepturi accusantium vitae soluta
          in iste itaque quae repudiandae, debitis inventore qui dolores.
          Reiciendis nihil tenetur neque architecto laudantium beatae commodi
          eos enim, ab harum veniam aut soluta accusamus ipsum a atque? Eveniet.
        </div>
        <div className={`${styles.imageWrapper1} ${styles.imageWrapper}`}>
          <Image src='/images/paintingplaceholder.jpg' alt='' fill />
        </div>
      </div>
      <div className={`${styles.wrapper2} ${styles.wrapper}`}>
        <div className={`${styles.title2} ${styles.title}`}>
          <div className={`${styles.name} ${dawning.className}`}>
            Cecilia <br />
            <span className={styles.surname}>Bergman</span>
          </div>
          <Image src='/images/ceciliaplaceholder.jpg' alt='' fill />
        </div>

        <div className={`${styles.socials2} ${styles.socials}`}>
          Kontaktinfo / social medier här
        </div>
        <div className={`${styles.text2} ${styles.text}`}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
          alias impedit voluptate asperiores culpa quo, reprehenderit nemo
          accusantium tempore iusto dolore expedita minima placeat, officiis est
          sequi accusamus debitis earum? Perferendis labore nostrum porro saepe
          mollitia natus unde a, doloremque nesciunt iusto repellat dicta
          consequuntur sequi sit veniam quasi distinctio. Ut officia accusantium
          in, perspiciatis repellendus saepe quo reiciendis veritatis! Laborum
          maxime cum odit. Quisquam modi ea, excepturi accusantium vitae soluta
          in iste itaque quae repudiandae, debitis inventore qui dolores.
          Reiciendis nihil tenetur neque architecto laudantium beatae commodi
          eos enim, ab harum veniam aut soluta accusamus ipsum a atque? Eveniet.
        </div>
        <div className={`${styles.imageWrapper2} ${styles.imageWrapper}`}>
          <Image fill src='/images/ceramicsplaceholder.jpg' alt='' />
        </div>
      </div>
    </>
  );
}

import Image from 'next/image';
import styles from './CatalogueCard.module.css';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/sanity';
import Link from 'next/link';

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).url();

const CatalogueCard = ({ event }) => {
  const formatDate = (date) => {
    return `${date.toLocaleDateString('sv-SE', { day: 'numeric', month: 'long' })} kl ${date.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}`;
  };
  return (
    <Link
      href={`/${event.slug.current}`}
      className={`${styles.card} ${event.category}`}
    >
      <div className={styles.imageContainer}>
        <Image
          src={urlFor(event.image.asset)}
          alt={event.image.alt}
          width={400}
          height={200}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{event.name}</h3>
        <div className={styles.dates}>
          <span>{formatDate(event.eventDateTime)}</span>
          <br />
          {event.category === 'workshop' ? 'workshop' : null}
        </div>
      </div>
    </Link>
  );
};

export default CatalogueCard;

'use client';
import { client } from '@/sanity/sanity';
import imageUrlBuilder from '@sanity/image-url';
import { useState, useEffect } from 'react';
import styles from './EventCard.module.css';
import { useParams, useRouter } from 'next/navigation';
import { fetchCourseBySlug } from '@/utils/fetchCourses';
import Form from '@/components/Form/Form';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { formatDateOnly, formatDateWithTime } from '@/utils/formatDates';

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).url();

export default function EventCard() {
  const { slug } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;

    setIsLoading(true);

    fetchCourseBySlug(slug).then(({ data, error }) => {
      if (error) {
        setError(error);
        if (error === 'Eventet hittades inte') {
          router.replace('/404');
        }
      } else {
        setEvent(data);
      }
      setIsLoading(false);
    });
  }, [slug, router]);

  if (isLoading) return <p className={styles.loading}>Laddar...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!event) return null;

  return (
    <div className={`${styles.wrapper} margin`}>
      <div className={styles.imageWrapper}>
        <Image
          src={urlFor(event.image.asset)}
          alt={event.image.alt}
          fill
          className={styles.test}
        />
      </div>

      <div className={styles.header}>
        <h1>{event.name}</h1>
        <h4>{event.category}</h4>
      </div>
      <div className={styles.overview}>
        <div>
          <strong>Lediga platser:</strong> {event.freeSeats} av {event.seats}
        </div>

        <ul>
          <strong>
            {event.eventDateTime.length >= 2 ? 'Tillfällen' : 'Tid'}:
          </strong>
          {event.eventDateTime.map((dateTime, key) => {
            return (
              <li key={key} className={styles.time}>
                {formatDateWithTime(dateTime)}
              </li>
            );
          })}
          <small className={styles.sessionLength}>
            {event.category === 'Workshop' ? (
              <>
                Workshoppen varar i {event.hour}{' '}
                {event.hour > 2 ? 'timmar' : 'timme'}
              </>
            ) : (
              <>
                (Varje kurstillfälle är {event.hour}{' '}
                {event.hour > 2 ? 'timmar' : 'timme'})
              </>
            )}
            <br />
            {event.signUpBy &&
              `Anmäl senast den ${formatDateOnly(event.signUpBy)}`}
          </small>
        </ul>

        <div>
          <strong>Hålls av:</strong> {event.instructor}
        </div>

        <div>
          <strong>Pris:</strong> {event.price} kr
        </div>
      </div>
      <div className={styles.description}>
        <PortableText value={event.description} />
      </div>
      <div className={styles.form}>
        <Form event={event} />
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import styles from './EventCard.module.css';
import { useParams, useRouter } from 'next/navigation';
import { fetchCourseBySlug } from '@/utils/fetchCourses';
import Form from '@/components/Form/Form';

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
        if (error === 'Kursen hittades inte') {
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
    <div className={styles.wrapper}>
      <h1>{event.name}</h1>
      <p>
        <strong>Lediga platser:</strong> {event.freeSeats} av {event.seats}
      </p>
      <p>
        <strong>{event.eventDateTime.length >= 2 ? 'Tider' : 'Tid'}:</strong>{' '}
        {event.eventDateTime.map((dateTime, key) => {
          return (
            <span key={key}>
              {dateTime} ({event.hour} timmar)
            </span>
          );
        })}
      </p>
      <p></p>
      <p>
        <strong>Instruktör:</strong> {event.instructor}
      </p>
      <p>
        <strong>Kategori:</strong> {event.category}
      </p>
      <p>
        <strong>Pris:</strong> {event.price} SEK
      </p>
      <p>
        <strong>Beskrivning:</strong>{' '}
      </p>
      <Form event={event} />
    </div>
  );
}

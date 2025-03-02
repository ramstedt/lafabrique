'use client';

import { useState, useEffect } from 'react';
import styles from './EventCard.module.css';
import { useParams, useRouter } from 'next/navigation';
import { fetchCourseBySlug } from '@/utils/fetchCourses';

export default function EventCard() {
  const { slug } = useParams();
  const router = useRouter();

  const [course, setCourse] = useState(null);
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
        setCourse(data);
      }
      setIsLoading(false);
    });
  }, [slug, router]);

  if (isLoading) return <p className={styles.loading}>Laddar kurs...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!course) return null;

  return (
    <div className={styles.wrapper}>
      <h1>{course.name}</h1>
      <p>
        <strong>Instruktör:</strong> {course.instructor}
      </p>
      <p>
        <strong>Kategori:</strong> {course.category}
      </p>
      <p>
        <strong>Pris:</strong> {course.price} SEK
      </p>
      <p>
        <strong>Beskrivning:</strong>{' '}
      </p>
    </div>
  );
}

'use client';

import { useState, useEffect, useMemo } from 'react';
import CatalogueCard from '@/components/CatalogueCard/CatalogueCard';
import EventFilter from '@/components/EventFilter/EventFilter';
import { fetchCourses } from '@/utils/fetchCourses';
import styles from './page.module.css';
import { groupByMonth } from '@/utils/groupByMonth';
import Image from 'next/image';

export default function Catalogue() {
  const [selectedCategory, setSelectedCategory] = useState('alla');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const coursesResponse = await fetchCourses();

      const courses = Array.isArray(coursesResponse?.data?.courses)
        ? coursesResponse.data.courses
        : Array.isArray(coursesResponse?.data)
          ? coursesResponse.data
          : [];

      setEvents([...courses]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const now = new Date();

  // Find the earliest future date
  const filteredEvents = useMemo(() => {
    return events
      .map((event) => {
        const futureDates = event.eventDateTime
          .map((date) => new Date(date))
          .filter((date) => date > now)
          .sort((a, b) => a - b);

        if (futureDates.length === 0) return null;

        return { ...event, eventDateTime: futureDates[0] }; // Keep the event with its earliest future date
      })
      .filter(Boolean) // Remove events that only have dates in the past
      .sort((a, b) => a.eventDateTime - b.eventDateTime);
  }, [events]);

  const categorizedEvents = useMemo(() => {
    if (selectedCategory === 'alla') return filteredEvents;
    return filteredEvents.filter(
      (event) => event.category === selectedCategory
    );
  }, [selectedCategory, filteredEvents]);

  const groupedByMonth = useMemo(
    () => groupByMonth(categorizedEvents),
    [categorizedEvents]
  );

  return (
    <main>
      <EventFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        events={events}
      />
      {/* <div className="bgImageWrapper">
        <Image
          src="/assets/test.png"
          width={300}
          height={300}
          alt="Camomile flower sketch"
          className="bgImage"
          priority
        />
        <Image
          src="/assets/easel.png"
          width={400}
          height={400}
          alt="Camomile flower sketch"
          className="bgImage"
          priority
        />{' '}
        <Image
          src="/assets/cups-flowers.svg"
          width={200}
          height={200}
          alt="Camomile flower sketch"
          className="bgImage"
          priority
        />
      </div> */}
      {loading ? (
        <p>Loading...</p>
      ) : Object.keys(groupedByMonth).length > 0 ? (
        Object.keys(groupedByMonth).map((month) => (
          <div key={month}>
            <h2>{month.charAt(0).toUpperCase() + month.slice(1)}</h2>
            <div className={styles.cardsWrapper}>
              {groupedByMonth[month].map((event) => (
                <CatalogueCard
                  key={event._id + event.eventDateTime.toISOString()}
                  event={event}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>
          Det finns inga planerade kurser eller i denna kategori för tillfället.
        </p>
      )}
    </main>
  );
}

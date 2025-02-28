'use client';

import { useState, useEffect, useMemo } from 'react';
import CatalogueCard from '@/components/CatalougeCard/CatalogueCard';
import EventFilter from '@/components/EventFilter/EventFilter';
import { fetchCourses } from '@/utils/fetchCourses';
import styles from './page.module.css';

export default function Catalogue() {
  const [selectedCategory, setSelectedCategory] = useState('all');
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

  const transformedData = events
    .flatMap((event) =>
      event.eventDateTime.map((date) => ({
        ...event,
        eventDateTime: new Date(date),
      }))
    )
    .filter((event) => event.eventDateTime > now)
    .sort((a, b) => a.eventDateTime - b.eventDateTime);

  // Filter by category
  const filteredEvents = useMemo(() => {
    if (selectedCategory === 'all') return transformedData;
    return transformedData.filter(
      (event) => event.category === selectedCategory
    );
  }, [selectedCategory, transformedData]);

  // Group by month
  const groupedByMonth = filteredEvents.reduce((acc, event) => {
    const monthYear = event.eventDateTime.toLocaleString('sv-SE', {
      month: 'long',
      year: 'numeric',
    });
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(event);
    return acc;
  }, {});

  return (
    <main>
      <EventFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        events={events}
      />

      {loading ? (
        <p>Loading...</p> // Ensure this message appears while fetching
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

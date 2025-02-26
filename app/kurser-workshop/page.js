'use client';

import { useState, useMemo, useEffect, Fragment } from 'react';
import EventCardLarge from '@/components/EventCardLarge/EventCardLarge';
import EventFilter from '@/components/EventFilter/EventFilter';
import { fetchCourses } from '@/utils/fetchCourses';
import { fetchWorkshops } from '@/utils/fetchWorkshops';
import groupByMonth from '@/utils/groupByMonth';
import styles from './page.module.css';

export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const coursesResponse = await fetchCourses();
      const workshopsResponse = await fetchWorkshops();

      const courses = Array.isArray(coursesResponse?.data?.courses)
        ? coursesResponse.data.courses
        : Array.isArray(coursesResponse?.data)
          ? coursesResponse.data
          : [];

      const workshops = Array.isArray(workshopsResponse?.data?.workshops)
        ? workshopsResponse.data.workshops
        : Array.isArray(workshopsResponse?.data)
          ? workshopsResponse.data
          : [];

      setAllEvents([...courses, ...workshops]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(allEvents.map((event) => event.category));
    return Array.from(uniqueCategories);
  }, [allEvents]);

  const months = useMemo(() => {
    const uniqueMonths = new Set(
      allEvents.map((event) =>
        new Date(event.eventDateTime[0]).toLocaleString('default', {
          month: 'long',
          year: 'numeric',
        })
      )
    );
    return Array.from(uniqueMonths);
  }, [allEvents]);

  const handleFilterChange = ({ category, month }) => {
    setSelectedCategory(category);
    setSelectedMonth(month);
  };

  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      const matchesCategory =
        selectedCategory === 'all' || event.category === selectedCategory;

      return matchesCategory;
    });
  }, [selectedCategory, allEvents]);

  const groupedEvents = groupByMonth(filteredEvents);

  if (loading) {
    return <main>Loading...</main>;
  }

  return (
    <main>
      <EventFilter
        categories={categories}
        months={months}
        onFilterChange={handleFilterChange}
      />

      {filteredEvents.length === 0 && (
        <p>No events found for the selected filters.</p>
      )}

      {Object.entries(groupedEvents).map(([month, events], monthIndex) => (
        <section key={`${month}-${monthIndex}`} className={styles.section}>
          <h2>{month.charAt(0).toUpperCase() + month.slice(1)}</h2>

          {events.map((event, eventIndex) => (
            <EventCardLarge
              key={`${event._id}-${eventIndex}`}
              event={event}
              month={month.charAt(0).toUpperCase() + month.slice(1)}
            />
          ))}
        </section>
      ))}
    </main>
  );
}

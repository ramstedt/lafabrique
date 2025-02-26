import Image from 'next/image';
import styles from './EventCardLarge.module.css';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/sanity';

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).url();

const formatDates = (dateArray) => {
  if (!dateArray || !Array.isArray(dateArray) || dateArray.length === 0) {
    return ['Okänt datum'];
  }

  return dateArray.map((dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Okänt datum';

    return date.toLocaleDateString('sv-SE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  });
};

const compareDates = (dateString, month) => {
  if (!dateString || !month) return false;
  const dateParts = dateString.split(' ');
  if (dateParts.length < 5) return false;

  let extractedMonthYear = `${dateParts[2]} ${dateParts[3]}`;
  extractedMonthYear =
    extractedMonthYear.charAt(0).toUpperCase() + extractedMonthYear.slice(1);

  return extractedMonthYear === month;
};

const EventCardLarge = ({ event, month, date }) => {
  const formattedDates = formatDates(event.eventDateTime);

  const now = new Date();
  const nowISO = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}-${String(now.getUTCDate()).padStart(2, '0')}T${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')}:${String(now.getUTCSeconds()).padStart(2, '0')}.000Z`;
  return event.eventDates.map((eventDate) => {
    return eventDate >= nowISO ? (
      <div key={eventDate} className={`${styles.card} ${event.category}`}>
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
          <p className={styles.instructor}>Instruktör: {event.instructor}</p>
          <p className={styles.price}>Pris: {event.price} SEK</p>
          <div className={styles.dates}>
            <strong>Datum:</strong>
            <ul>
              {formattedDates
                .filter((date) => compareDates(date, month))
                .map((date, index) => (
                  <li key={index}>
                    {date.charAt(0).toUpperCase() + date.slice(1)}
                  </li>
                ))}
            </ul>
            type: {event.category}
          </div>
        </div>
      </div>
    ) : null;
  });
};

export default EventCardLarge;

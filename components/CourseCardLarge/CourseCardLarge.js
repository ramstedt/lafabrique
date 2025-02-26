import Image from 'next/image';
import styles from './CourseCardLarge.module.css';
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

  const extractedMonthYear = `${dateParts[2]} ${dateParts[3]}`;

  return extractedMonthYear === month;
};

const CourseCardLarge = ({ course, month }) => {
  const formattedDates = formatDates(course.eventDateTime);

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={urlFor(course.image.asset)}
          alt={course.image.alt}
          width={400}
          height={200}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{course.name}</h3>
        <p className={styles.instructor}>Instruktör: {course.instructor}</p>
        <p className={styles.price}>Pris: {course.price} SEK</p>
        <div className={styles.dates}>
          <strong>Datum:</strong>
          <ul>
            {formattedDates
              .filter((date) => compareDates(date, month))
              .map((date, index) => (
                <li key={index}>{date}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseCardLarge;

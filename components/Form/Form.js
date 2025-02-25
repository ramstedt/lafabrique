import { useRouter } from 'next/router';
import { client } from '@/sanity/lib/client';
import { useState, useEffect } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import SanityBlockContent from '@sanity/block-content-to-react';
import Image from 'next/image';
import ClipLoader from 'react-spinners/ClipLoader';
import styles from './Form.module.css';

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

export default function CoursePage() {
  const router = useRouter();
  const { slug } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [disableButton, setDisabledButton] = useState(false);

  useEffect(() => {
    if (slug) {
      setIsLoading(true);
      client
        .fetch(`*[_type == "course"]`)
        .then((coursesData) => {
          if (!coursesData || coursesData.length === 0) {
            router.replace('/404');
          } else {
            setCourses(coursesData);
          }
        })
        .catch((error) => {
          console.error('Error fetching courses:', error);
          setError('Failed to load courses.');
        })
        .finally(() => setIsLoading(false));
    }
  }, [slug, router]);

  useEffect(() => {
    if (courses) {
      const course = courses.find((course) => course.slug.current === slug);
      if (course) {
        setSelectedCourse(course);
      } else {
        setError('Course not found');
        router.replace('/404');
      }
    }
  }, [courses, slug, router]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setDisabledButton(true);
    const { firstName, surname, email, phone, message } = formData;

    const requestData = {
      firstName,
      surname,
      email,
      phone,
      message,
      course: selectedCourse?.name,
      sendTo: selectedCourse?.sendTo,
    };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      if (result.success) {
        setStatus('Tack! Din förfrågan har skickats.');
      } else {
        setStatus('Något gick fel, försök igen senare.');
      }
    } catch (error) {
      setStatus('Fel vid skickande av formulär.');
    } finally {
      setFormData({
        firstName: '',
        surname: '',
        email: '',
        phone: '',
        message: '',
      });
      setDisabledButton(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.content}>
      <h1>{selectedCourse?.name}</h1>
      <div className={styles.summaryWrapper}>
        <div className={styles.summary}>
          <div>
            <b>Instruktör:</b> {selectedCourse?.instructor}
          </div>
          <div>
            <b>När:</b> {selectedCourse?.startDate}
          </div>
          <div>
            <b>Antal timmar:</b> {selectedCourse?.hour} h
          </div>
          <div>
            <b>Pris:</b> {selectedCourse?.price} kr
          </div>
          <div>
            <b>Antal platser:</b> {selectedCourse?.seats}{' '}
            {selectedCourse?.freeSeats === 0
              ? '(Fullbokat)'
              : `(${selectedCourse?.freeSeats} lediga)`}
          </div>
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src={selectedCourse?.image && urlFor(selectedCourse?.image).url()}
            alt={selectedCourse?.image?.alt || 'Course image'}
            fill
          />
        </div>
      </div>
      <div>
        {selectedCourse?.description ? (
          <SanityBlockContent blocks={selectedCourse.description} />
        ) : null}
      </div>

      {selectedCourse?.freeSeats === 0 ? (
        'Kursen är för tillfället fullbokad'
      ) : (
        <form className={styles.form} onSubmit={onSubmit}>
          <h2>Boka kursplats</h2>
          <div className={styles.formBlock}>
            <div>
              <label htmlFor="firstName">Ange ditt förnamn</label>{' '}
              <label htmlFor="surname">och efternamn</label>
            </div>
            <div className={styles.nameInputs}>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                id="firstName"
                placeholder="Förnamn"
                required
              />
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                id="surname"
                placeholder="Efternamn"
                required
              />
            </div>
          </div>
          <div className={styles.formBlock}>
            <label htmlFor="email">Ange din emailadress</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              id="email"
              placeholder="email@email.com"
              required
            />
          </div>
          <div className={styles.formBlock}>
            <label htmlFor="phone">Ange ditt telefonnummer</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              id="phone"
              placeholder="0702000000"
              required
            />
          </div>
          <div className={styles.formBlock}>
            <label htmlFor="message">Meddelande</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              id="message"
              placeholder="Skriv ditt meddelande..."
            ></textarea>
          </div>
          <div className={styles.formBlock}>
            <p>{status}</p>
            <button
              className={styles.button}
              type="submit"
              disabled={disableButton}
            >
              {disableButton ? (
                <ClipLoader
                  color="#994ff3"
                  size={14}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                'Skicka förfrågan'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

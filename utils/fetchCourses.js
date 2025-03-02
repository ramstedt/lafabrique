import { client } from '@/sanity/sanity';

export const fetchCourses = async () => {
  try {
    const query = `{
      "courses": *[_type == "course"] | order(_createdAt asc)
    }`;

    const fetch = await client.fetch(query);
    const data = fetch.courses;
    return { data };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: null };
  }
};

export const fetchCourseBySlug = async (slug) => {
  if (!slug) return { data: null, error: 'No slug provided', isLoading: false };

  try {
    const query = `*[_type == "course" && slug.current == $slug][0]`;
    const data = await client.fetch(query, { slug });

    if (!data) {
      return { data: null, error: 'Kursen hittades inte', isLoading: false };
    }

    return { data, error: null, isLoading: false };
  } catch (error) {
    console.error('Error fetching course:', error);
    return { data: null, error: 'Kunde inte hämta kursen.', isLoading: false };
  }
};

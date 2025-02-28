import CatalogueCard from '@/components/CatalogueCard/CatalogueCard';
import { fetchCourses } from '@/utils/fetchCourses';
import groupByMonth from '@/utils/groupByMonth';

export default async function Courses() {
  const { data } = await fetchCourses();
  const groupedCourses = groupByMonth(data);

  return (
    <main>
      {Object.entries(groupedCourses).map(([month, courses]) => (
        <section key={month}>
          <h2>{month}</h2>
          {courses.map((course, index) => (
            <CatalogueCard
              key={`${course._id}-${index}`}
              event={course}
              month={month}
            />
          ))}
        </section>
      ))}
    </main>
  );
}

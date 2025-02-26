import CourseCardLarge from '@/components/CourseCardLarge/CourseCardLarge';
import { fetchData } from '@/utils/fetchCourses';
import groupByMonth from '@/utils/groupByMonth';

export default async function Courses() {
  const { data } = await fetchData();
  const groupedCourses = groupByMonth(data.courses);

  return (
    <main>
      {Object.entries(groupedCourses).map(([month, courses]) => (
        <section key={month}>
          <h2>{month}</h2>
          {courses.map((course, index) => (
            <CourseCardLarge
              key={`${course._id}-${index}`}
              course={course}
              month={month}
            />
          ))}
        </section>
      ))}
    </main>
  );
}

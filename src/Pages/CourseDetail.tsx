import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../Store'; // Ensure this path is correct

interface SyllabusItem {
  week: number;
  topic: string;
  content: string;
}

interface Course {
  id: number;
  name: string;
  instructor: string;
  description: string;
  enrollmentStatus: string;
  duration: string;
  schedule: string;
  location: string;
  prerequisites: string[];
  syllabus: SyllabusItem[];
  thumbnail?: string;
}

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const courses = useSelector((state: RootState) => state.courses.courses);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate loading state for course data
    setLoading(true);
    const selectedCourse = courses.find(course => course.id === parseInt(id ?? ''));
    setCourse(selectedCourse || null);
    setLoading(false);
  }, [id, courses]);

  if (loading) return <p className="text-center p-4 text-gray-500">Loading...</p>;
  if (!course) return <Navigate to="/" />;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-background min-h-screen">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={course.thumbnail || '/default-thumbnail.png'}
          alt={course.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-4xl font-extrabold text-primary mb-4">{course.name}</h1>
          <p className="text-lg text-gray-700 mb-4"><strong>Instructor:</strong> {course.instructor}</p>
          <p className="text-base text-gray-800 mb-4"><strong>Description:</strong> {course.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-base text-gray-800 mb-2"><strong>Status:</strong> {course.enrollmentStatus}</p>
              <p className="text-base text-gray-800 mb-2"><strong>Duration:</strong> {course.duration}</p>
              <p className="text-base text-gray-800 mb-2"><strong>Schedule:</strong> {course.schedule}</p>
              <p className="text-base text-gray-800 mb-4"><strong>Location:</strong> {course.location}</p>
              <p className="text-base text-gray-800 mb-4"><strong>Prerequisites:</strong> {course.prerequisites.join(', ')}</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-primary mb-2">Syllabus</h3>
              {course.syllabus.map((item, index) => (
                <div key={index} className="mb-4 border-b border-gray-200 pb-4">
                  <h4 className="text-lg font-semibold text-secondary mb-1">Week {item.week}: {item.topic}</h4>
                  <p className="text-gray-700">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition">
              Enroll Now
            </button>
            <Link to="/" className="text-secondary hover:underline">
              Back to Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store';
import { setCourses } from '../Slices/courseSlice';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CourseList = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state: RootState) => state.courses.courses);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/data/courses.json');
        dispatch(setCourses(response.data));
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [dispatch]);

  const filteredCourses = courses.filter((course:any) =>
    course.name.toLowerCase().includes(search.toLowerCase()) ||
    course.instructor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto bg-background min-h-screen">
   <div className="flex items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Search by course name or instructor"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-2/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Link to="/dashboard" className="ml-4 inline-block px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition">
          Dashboard
        </Link>
      </div>
      <div className="space-y-6">
        {filteredCourses.map((course:any) => (
          <div key={course.id} className="p-6 border border-gray-200 rounded-lg shadow-lg bg-card">
            <h3 className="text-2xl font-semibold text-primary">{course.name}</h3>
            <p className="text-gray-600">Instructor: {course.instructor}</p>
            <Link to={`/courses/${course.id}`} className="text-secondary hover:underline mt-2 block">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;

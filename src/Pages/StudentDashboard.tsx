import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { RootState } from '../Store';
import { setEnrolledCourses, markCourseAsCompleted } from '../Slices/studentSlice';

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const enrolledCourses = useSelector((state: RootState) => state.students.enrolledCourses);
  const [courseList, setCourseList] = useState<any[]>(enrolledCourses);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await fetch('/data/courses.json');
        const data = await response.json();
        dispatch(setEnrolledCourses(data));
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
      }
    };

    fetchEnrolledCourses();
  }, [dispatch]);

  useEffect(() => {
    setCourseList(enrolledCourses);
  }, [enrolledCourses]);

  const handleMarkAsCompleted = (courseId: number) => {
    dispatch(markCourseAsCompleted(courseId));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-background min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-primary">Student Dashboard</h1>
      <div className="space-y-6">
        {courseList.map(course => (
          <div key={course.id} className="p-6 border border-gray-200 rounded-lg shadow-lg bg-card">
            <h3 className="text-2xl font-semibold text-primary">{course.name}</h3>
            <p className="text-gray-600 mb-2">Instructor: {course.instructor}</p>
            <img src={course.thumbnail || '/default-thumbnail.png'} alt={course.name} className="w-full h-60 object-cover mb-4 rounded-lg" />
            <p className="mb-2">Due Date: {course.dueDate || 'N/A'}</p>
            <div className="flex items-center space-x-2 mb-4">
              <progress className="flex-1" value={course.progress || 0} max="100"></progress>
              <span>{course.progress || 0}% Complete</span>
            </div>
            <button
              onClick={() => handleMarkAsCompleted(course.id)}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition"
            >
              Mark as Completed
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;

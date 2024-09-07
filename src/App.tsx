import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CourseList from './Pages/CourseList';
import StudentDashboard from './Pages/StudentDashboard';
import NotFound from './Pages/NotFoundPage';
import CourseDetails from './Pages/CourseDetail';


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;

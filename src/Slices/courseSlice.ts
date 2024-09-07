import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  syllabus: Array<{
    week: number;
    topic: string;
    content: string;
  }>;
  thumbnail?: string;
}

interface CourseState {
  courses: Course[];
}

const initialState: CourseState = {
  courses: [],
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
    addCourse: (state, action: PayloadAction<Course>) => {
      state.courses.push(action.payload);
    },
    updateCourse: (state, action: PayloadAction<Course>) => {
      const index = state.courses.findIndex(course => course.id === action.payload.id);
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    },
    removeCourse: (state, action: PayloadAction<number>) => {
      state.courses = state.courses.filter(course => course.id !== action.payload);
    },
  },
});

export const { setCourses, addCourse, updateCourse, removeCourse } = courseSlice.actions;
export default courseSlice.reducer;

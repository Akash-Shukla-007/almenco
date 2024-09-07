import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EnrolledCourse {
  id: number;
  name: string;
  instructor: string;
  dueDate?: string;
  progress?: number;
  thumbnail?: string;
}

interface StudentState {
  enrolledCourses: EnrolledCourse[];
}

const initialState: StudentState = {
  enrolledCourses: [],
};
const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setEnrolledCourses: (state, action: PayloadAction<EnrolledCourse[]>) => {
      state.enrolledCourses = action.payload;
    },
    addEnrolledCourse: (state, action: PayloadAction<EnrolledCourse>) => {
      state.enrolledCourses.push(action.payload);
    },
    updateEnrolledCourse: (state, action: PayloadAction<EnrolledCourse>) => {
      const index = state.enrolledCourses.findIndex(course => course.id === action.payload.id);
      if (index !== -1) {
        state.enrolledCourses[index] = action.payload;
      }
    },
    removeEnrolledCourse: (state, action: PayloadAction<number>) => {
      state.enrolledCourses = state.enrolledCourses.filter(course => course.id !== action.payload);
    },
    markCourseAsCompleted: (state, action: PayloadAction<number>) => {
      const course = state.enrolledCourses.find(course => course.id === action.payload);
      if (course) {
        course.progress = 100;
      }
    },
  },
});

export const { setEnrolledCourses, addEnrolledCourse, updateEnrolledCourse, removeEnrolledCourse, markCourseAsCompleted } = studentSlice.actions;
export default studentSlice.reducer;

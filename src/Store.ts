import { configureStore } from '@reduxjs/toolkit';
import courseReducer from './Slices/courseSlice';
import studentReducer from './Slices/studentSlice';

// Create the Redux store
export const store = configureStore({
  reducer: {
    courses: courseReducer,
    students: studentReducer,
  },
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type
export type AppDispatch = typeof store.dispatch;

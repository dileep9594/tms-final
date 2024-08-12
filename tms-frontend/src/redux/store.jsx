import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import taskSlice from './taskSlice';

const store = configureStore({
  reducer: {
    taskSlice: taskSlice,
  },
});

export default store;
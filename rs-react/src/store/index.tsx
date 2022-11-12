import { configureStore } from '@reduxjs/toolkit';
import photosReducer from './photosSlice';
import formReducer from './formSlice';

export const store = configureStore({
  reducer: {
    photos: photosReducer,
    form: formReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import fishReducer from './slices/fishSlice'
import categoryReducer from './slices/catrgorySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    fish: fishReducer,
    category: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
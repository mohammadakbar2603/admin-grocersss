import { configureStore } from '@reduxjs/toolkit';
import grocersssReducer from './grocersssSlice';

export const store = configureStore({
    reducer: grocersssReducer,
})
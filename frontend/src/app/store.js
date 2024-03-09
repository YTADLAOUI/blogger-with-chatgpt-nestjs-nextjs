import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import blogReducer from '../features/editSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
   },
})
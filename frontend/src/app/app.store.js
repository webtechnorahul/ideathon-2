import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/state/auth.slice.js'
import aiReducer from '../features/ai/state/ai.slice.js'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        ai: aiReducer
    }
})
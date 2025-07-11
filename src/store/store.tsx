import { configureStore } from '@reduxjs/toolkit';
import { scheduleApi } from "./scheduleApi";
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from '../features/auth/supabaseAuth';



export const store = configureStore({
    reducer: {
        [scheduleApi.reducerPath]: scheduleApi.reducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(scheduleApi.middleware).concat(authApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
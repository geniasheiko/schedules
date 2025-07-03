import { configureStore } from '@reduxjs/toolkit';
import { scheduleApi } from "./scheduleApi";


export const store = configureStore({
    reducer: {
        [scheduleApi.reducerPath]: scheduleApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(scheduleApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
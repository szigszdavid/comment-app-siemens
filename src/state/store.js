import { configureStore } from "@reduxjs/toolkit";
import { commentsApiSlice, commentsApiSliceReducer } from "./commentsApi";

export const store = configureStore({
    reducer: {
        [commentsApiSlice.reducerPath]: commentsApiSliceReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(commentsApiSlice.middleware),
})
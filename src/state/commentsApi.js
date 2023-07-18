import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://jsonplaceholder.typicode.com/"

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
})

export const commentsApiSlice = createApi({
    reducerPath: 'commentsApi',
    baseQuery: baseQuery, // fetchBaseQuery({ baseUrl: BASE_URL})
    endpoints: (builder) => ({
        getComments: builder.query({
            query: () => ({
                url: "comments"
            }),
        }),
    }),
})

//reducer
export const commentsApiSliceReducer = commentsApiSlice.reducer;

//Automatikusan generált hookok:
//hooks
export const { 
    useGetCommentsQuery
 } = commentsApiSlice
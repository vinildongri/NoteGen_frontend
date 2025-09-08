import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const noteApi = createApi({
    reducerPath: "noteApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_BASE_URL,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        cratenotes: builder.mutation({
            query: (body) => ({
                url: "/notes",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const { useCratenotesMutation } = noteApi;
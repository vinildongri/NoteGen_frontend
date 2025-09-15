import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setIsAuthenticated, setUser } from "../features/userSlice.js";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: process.env.REACT_APP_API_BASE_URL,
        credentials: "include",
    }),
    
    endpoints: (builder) => ({

        register: builder.mutation({
            query: (body) => ({
                url: "/register",
                method: "POST",
                body,
            }),
        }),

        login: builder.mutation({
            query: (body) => ({
                url:"/login",
                method: "POST",
                body,
            }),
            invalidatesTags: ['User'],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                const { data } = await queryFulfilled;
                console.log({data});
                // assuming backend returns user details in `data.user`
                dispatch(setUser(data.user));
                dispatch(setIsAuthenticated(true));
                } catch (err) {
                console.error("Login failed:", err);
                }
            },
        }),

        logout: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST",
            }),
        }),
        
        updateUser: builder.mutation({
            query: (body) => ({
                url: "/me/update",
                method: "PUT",
                body,
            }),
        }),

    }),
      
});

export const { 
    useLoginMutation,
    useRegisterMutation, 
    useLogoutMutation, 
    useUpdateUserMutation,
    // useUpdatePasswordMutation,
} = authApi;
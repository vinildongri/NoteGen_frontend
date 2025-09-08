import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setIsAuthenticated, setUser } from "../features/userSlice";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_BASE_URL,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getMe: builder.query({
        query: () => "/me",
        // transformResponse: (result) => result.user,
        // async onQueryStarted (args, {dispatch, queryFulfilled}){
        //     try{
        //         const { data } = await queryFulfilled;
        //         console.log("✅ Raw /me response:", {data});
        //         dispatch(setUser(data));
        //         dispatch(setIsAuthenticated(true));
        //     }catch(error){
        //         console.log(error);
        //         }
        //     }
        }),
    }),
});

export const { useGetMeQuery } = userApi;

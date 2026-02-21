import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { setIsAuthenticated, setUser } from "../features/userSlice";
// import ResetPassword from "../../components/user/ResetPassword";

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

        updatePassword: builder.mutation({
            query: (body) => ({
                url: "/password/update",
                method: "PUT",
                body,
            }),
        }),

        forgotPassword: builder.mutation({
            query: (body) => ({
                url: "/password/forgot",
                method: "POST",
                body,
            }),
        }),

        resetPassword: builder.mutation({
            query: ({ token, body}) => ({
                url: `/password/reset/${token}`,
                method: "PUT",
                body,
            }),
        }),

    }),
});

export const { useGetMeQuery, useUpdatePasswordMutation, useForgotPasswordMutation, useResetPasswordMutation } = userApi;

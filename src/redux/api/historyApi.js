import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const historyApi = createApi({
  reducerPath: "historyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/history", // ✅ backend base route
    credentials: "include",
  }),
  tagTypes: ["History"],
  endpoints: (builder) => ({
    createHistory: builder.mutation({
      query: ({ userId, firstMessage }) => ({
        url: "", // ✅ FIXED: no slash, hits POST /api/v1/history
        method: "POST",
        body: { userId, firstMessage },
      }),
      invalidatesTags: [{ type: "History", id: "LIST" }],
    }),
    addMessage: builder.mutation({
      query: ({ historyId, role, content }) => ({
        url: `/${historyId}/message`, // POST /api/v1/history/:id/message
        method: "POST",
        body: { role, content },
      }),
      invalidatesTags: (result, error, { historyId }) => [
        { type: "History", id: historyId },
      ],
    }),
    getUserHistories: builder.query({
      query: (userId) => `/user/${userId}`, // GET /api/v1/history/user/:userId
      providesTags: (result) =>
        result
          ? [
              ...(Array.isArray(result.histories || result)
                ? (result.histories || result).map(({ _id }) => ({
                    type: "History",
                    id: _id,
                  }))
                : []),
              { type: "History", id: "LIST" },
            ]
          : [{ type: "History", id: "LIST" }],
    }),
    getHistoryById: builder.query({
      query: (id) => `/${id}`, // GET /api/v1/history/:id
      providesTags: (result, error, id) => [{ type: "History", id }],
    }),
  }),
});

export const {
  useCreateHistoryMutation,
  useAddMessageMutation,
  useGetUserHistoriesQuery,
  useLazyGetHistoryByIdQuery,
} = historyApi;

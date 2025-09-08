import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/userSlice.js"

import { noteApi } from "./api/noteApi";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
// import { historyApi } from "./api/historyApi.js";

export const store = configureStore({
    reducer: {
        auth: userReducer,
        [noteApi.reducerPath]: noteApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        // [historyApi.reducerPath]: historyApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(noteApi.middleware, authApi.middleware, userApi.middleware),
});

export default store;
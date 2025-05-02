import { configureStore } from "@reduxjs/toolkit";
import { CheckoutForumSlice } from "./checkoutForumSlice";

export const store = configureStore({
    reducer: {
        checkoutForum: CheckoutForumSlice.reducer,
    },
    }); 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
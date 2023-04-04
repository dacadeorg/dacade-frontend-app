import {
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import {
  referralsApi,
  referralSlice,
} from "./feature/referrals.slice";
import ui from "./feature/ui.slice";

export interface IRootState {
  ui: ReturnType<typeof ui.reducer>;
  referrals: ReturnType<typeof referralSlice.reducer>;
}

const makeStore = () =>
  configureStore({
    reducer: {
      [ui.name]: ui.reducer,
      [referralSlice.name]: referralSlice.reducer,
      [referralsApi.reducerPath]: referralsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(referralsApi.middleware);
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);

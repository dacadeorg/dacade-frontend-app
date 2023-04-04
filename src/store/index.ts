import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import {
  referralsApi,
  referralSlice,
} from "./feature/referrals.slice";
import ui from "./feature/ui.slice";
import userSlice from "./feature/user.slice";
import { bannerSlice } from "./feature/banner.slice";

export interface IRootState {
  ui: ReturnType<typeof ui.reducer>;
  referrals: ReturnType<typeof referralSlice.reducer>;
  user: ReturnType<typeof userSlice.reducer>;
  banner: ReturnType<typeof bannerSlice.reducer>;
}

const makeStore = () =>
  configureStore({
    reducer: {
      [ui.name]: ui.reducer,
      [referralSlice.name]: referralSlice.reducer,
      [userSlice.name]: userSlice.reducer,
      [referralsApi.reducerPath]: referralsApi.reducer,
      [bannerSlice.name]: bannerSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(referralsApi.middleware);
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);

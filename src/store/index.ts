import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import {
  referralsApi,
  referralSlice,
} from "./feature/referrals.slice";
import community from "./feature/community.slice";
import ui from "./feature/ui.slice";
import userSlice from "./feature/user.slice";
import { bannerSlice } from "./feature/banner.slice";
import { notificationsSlice } from "./feature/notification.slice";
import walletSlice from "./feature/wallet.slice";
import reputationSlice from "./feature/reputation.slice";
import indexSlice from "./feature/index.slice";

export interface IRootState {
  communities: ReturnType<typeof community.reducer> ;
  ui: ReturnType<typeof ui.reducer>;
  referrals: ReturnType<typeof referralSlice.reducer>;
  user: ReturnType<typeof userSlice.reducer>;
  banner: ReturnType<typeof bannerSlice.reducer>;
  notifications: ReturnType<typeof notificationsSlice.reducer>;
  wallets: ReturnType<typeof walletSlice.reducer>;
  reputations: ReturnType<typeof reputationSlice.reducer>;
  store: ReturnType<typeof indexSlice.reducer>;
}

export const store =
  configureStore({
    reducer: {
      [ui.name]: ui.reducer,
      [community.name]: community.reducer,
      [referralSlice.name]: referralSlice.reducer,
      [userSlice.name]: userSlice.reducer,
      [notificationsSlice.name]: notificationsSlice.reducer,
      [bannerSlice.name]: bannerSlice.reducer,
      [walletSlice.name]: walletSlice.reducer,
      [reputationSlice.name]: reputationSlice.reducer,
      [indexSlice.name]: indexSlice.reducer,
      [referralsApi.reducerPath]: referralsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(referralsApi.middleware);
    },
    devTools: true,
  });

export const wrapper = createWrapper(() => store);

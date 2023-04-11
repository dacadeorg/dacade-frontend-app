import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import {
  referralsApi,
  referralSlice,
} from "./feature/referrals.slice";
import ui from "./feature/ui.slice";
import { communitiesApi } from "./feature/communities.slice";
import userSlice from "./feature/user.slice";
import { bannerSlice } from "./feature/banner.slice";
import { notificationsSlice } from "./feature/notification.slice";
import walletSlice from "./feature/wallet.slice";
import reputationSlice from "./feature/reputation.slice";
import indexSlice from "./feature/index.slice";

export interface IRootState {
  ui: ReturnType<typeof ui.reducer>;
  referrals: ReturnType<typeof referralSlice.reducer>;
  user: ReturnType<typeof userSlice.reducer>;
  banner: ReturnType<typeof bannerSlice.reducer>;
  notifications: ReturnType<typeof notificationsSlice.reducer>;
  wallets: ReturnType<typeof walletSlice.reducer>;
  reputations: ReturnType<typeof reputationSlice.reducer>;
  store: ReturnType<typeof indexSlice.reducer>;
  communities: ReturnType<typeof communitiesApi.reducer>;
}

const makeStore = () =>
  configureStore({
    reducer: {
      [ui.name]: ui.reducer,
      [referralSlice.name]: referralSlice.reducer,
      [userSlice.name]: userSlice.reducer,
      [notificationsSlice.name]: notificationsSlice.reducer,
      [bannerSlice.name]: bannerSlice.reducer,
      [walletSlice.name]: walletSlice.reducer,
      [reputationSlice.name]: reputationSlice.reducer,
      [indexSlice.name]: indexSlice.reducer,
      [referralsApi.reducerPath]: referralsApi.reducer,
      [communitiesApi.reducerPath]: communitiesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
        .concat(referralsApi.middleware)
        .concat(communitiesApi.middleware);
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);

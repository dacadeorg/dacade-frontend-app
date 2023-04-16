import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import communities from "./feature/community.slice";
import {
  referralsApi,
  referralSlice,
} from "./feature/referrals.slice";
import ui from "./feature/ui.slice";
import userSlice from "./feature/user.slice";
import { bannerSlice } from "./feature/banner.slice";
import { notificationsSlice } from "./feature/notification.slice";
import walletSlice from "./feature/wallet.slice";
import reputationSlice from "./feature/reputation.slice";
import indexSlice from "./feature/index.slice";
import { communitiesApi } from "./feature/communities.slice";
import authSlice from "./feature/auth.slice";
import scoreboardSlice from "./feature/communities/scoreboard.slice";

export interface IRootState {
  communities: ReturnType<typeof communities.reducer>;
  ui: ReturnType<typeof ui.reducer>;
  referrals: ReturnType<typeof referralSlice.reducer>;
  user: ReturnType<typeof userSlice.reducer>;
  banner: ReturnType<typeof bannerSlice.reducer>;
  notifications: ReturnType<typeof notificationsSlice.reducer>;
  wallets: ReturnType<typeof walletSlice.reducer>;
  reputations: ReturnType<typeof reputationSlice.reducer>;
  store: ReturnType<typeof indexSlice.reducer>;
  auth: ReturnType<typeof authSlice.reducer>;
  communitiesApi: ReturnType<typeof communitiesApi.reducer>;
  scoreboard: ReturnType<typeof scoreboardSlice.reducer>;
}

export const store = configureStore({
  reducer: {
    [ui.name]: ui.reducer,
    [referralSlice.name]: referralSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [notificationsSlice.name]: notificationsSlice.reducer,
    [bannerSlice.name]: bannerSlice.reducer,
    [walletSlice.name]: walletSlice.reducer,
    [reputationSlice.name]: reputationSlice.reducer,
    [indexSlice.name]: indexSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [communitiesApi.reducerPath]: communitiesApi.reducer,
    [referralsApi.reducerPath]: referralsApi.reducer,
    [scoreboardSlice.name]: scoreboardSlice.reducer,
    [communities.name]: communities.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      referralsApi.middleware,
      communitiesApi.middleware
    );
  },
  devTools: true,
});

export const wrapper = createWrapper(() => store);

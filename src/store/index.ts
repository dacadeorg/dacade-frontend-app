import {
  referralsApi,
  referralSlice,
} from "./feature/referrals.slice";
import { notificationsSlice } from "./feature/notification.slice";
import { communitiesApi } from "./feature/communities.slice";
import reputationSlice from "./feature/reputation.slice";
import { bannerSlice } from "./feature/banner.slice";
import { coursesApi } from "./feature/course.slice";
import { createWrapper } from "next-redux-wrapper";
import { configureStore } from "@reduxjs/toolkit";
import community from "./feature/community.slice";
import { communityService } from "./services/community.service";
import walletSlice from "./feature/wallet.slice";
import indexSlice from "./feature/index.slice";
import userSlice from "./feature/user.slice";
import authSlice from "./feature/auth.slice";
import ui from "./feature/ui.slice";

export interface IRootState {
  communities: ReturnType<typeof community.reducer>;
  ui: ReturnType<typeof ui.reducer>;
  referrals: ReturnType<typeof referralSlice.reducer>;
  user: ReturnType<typeof userSlice.reducer>;
  banner: ReturnType<typeof bannerSlice.reducer>;
  notifications: ReturnType<typeof notificationsSlice.reducer>;
  wallets: ReturnType<typeof walletSlice.reducer>;
  reputations: ReturnType<typeof reputationSlice.reducer>;
  store: ReturnType<typeof indexSlice.reducer>;
  auth: ReturnType<typeof authSlice.reducer>;
  communityApi: ReturnType<typeof communitiesApi.reducer>;
  communityService: ReturnType<typeof communityService.reducer>;
  courses: ReturnType<typeof coursesApi.reducer>;
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
    [community.name]: community.reducer,
    [authSlice.name]: authSlice.reducer,
    [communitiesApi.reducerPath]: communitiesApi.reducer,
    [communityService.reducerPath]: communityService.reducer,
    [referralsApi.reducerPath]: referralsApi.reducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      referralsApi.middleware,
      communitiesApi.middleware,
      coursesApi.middleware,
      communityService.middleware
    );
  },
  devTools: true,
});

export const wrapper = createWrapper(() => store);

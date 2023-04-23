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
import challengeSlice from "./feature/communities/challenges";
import courseSlice from "./feature/course.slice";
import communitySlice from "./feature/community.slice";
import submissionSlice from "./feature/communities/challenges/submissions";
import eventsSlice from "./feature/events.slice";
import { learningModules } from "./feature/learningModules.slice";
import { navigationSlice } from "./feature/communities/navigation.slice";

export interface IRootState {
  communities: ReturnType<typeof communities.reducer>;
  community: ReturnType<typeof communitySlice.reducer>;
  ui: ReturnType<typeof ui.reducer>;
  referrals: ReturnType<typeof referralSlice.reducer>;
  user: ReturnType<typeof userSlice.reducer>;
  banner: ReturnType<typeof bannerSlice.reducer>;
  notifications: ReturnType<typeof notificationsSlice.reducer>;
  wallets: ReturnType<typeof walletSlice.reducer>;
  reputations: ReturnType<typeof reputationSlice.reducer>;
  store: ReturnType<typeof indexSlice.reducer>;
  auth: ReturnType<typeof authSlice.reducer>;
  navigation: ReturnType<typeof navigationSlice.reducer>;
  scoreboard: ReturnType<typeof scoreboardSlice.reducer>;
  submission: ReturnType<typeof submissionSlice.reducer>;
  events: ReturnType<typeof eventsSlice.reducer>;
  communityApi: ReturnType<typeof communitiesApi.reducer>;
  challenges: ReturnType<typeof challengeSlice.reducer>;
  courses: ReturnType<typeof courseSlice.reducer>;
  learningModules: ReturnType<typeof learningModules.reducer>;
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
    [courseSlice.name]: courseSlice.reducer,
    [scoreboardSlice.name]: scoreboardSlice.reducer,
    [challengeSlice.name]: challengeSlice.reducer,
    [courseSlice.name]: courseSlice.reducer,
    [navigationSlice.name]: navigationSlice.reducer,
    [communitySlice.name]: communitySlice.reducer,
    [eventsSlice.name]: eventsSlice.reducer,
    [submissionSlice.name]: submissionSlice.reducer,
    [communitiesApi.reducerPath]: communitiesApi.reducer,
    [referralsApi.reducerPath]: referralsApi.reducer,
    [navigationSlice.name]: navigationSlice.reducer,
    [learningModules.name]: learningModules.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      referralsApi.middleware,
      communitiesApi.middleware,
      communitiesApi.middleware
    );
  },
  devTools: true,
});

export const wrapper = createWrapper(() => store);

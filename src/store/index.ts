import { referralSlice } from "./feature/referrals.slice";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import community from "./feature/community.slice";
import ui from "./feature/ui.slice";
import { bannerSlice } from "./feature/banner.slice";
import { notificationsSlice } from "./feature/notification.slice";
import reputationSlice from "./feature/reputation.slice";
import { coursesService } from "./services/course.service";
import { communityService } from "./services/community.service";
import walletSlice from "./feature/wallet.slice";
import indexSlice from "./feature/index.slice";
import authSlice from "./feature/auth.slice";
import walletService from "./services/wallet.service";
import userService from "./services/user.service";
import reputationService from "./services/reputation.service";
import referralsService from "./services/referrals.service";
import notificationsService from "./services/notification.service";
import scoreboardSlice from "./feature/communities/scoreboard.slice";
import courseSlice from "./feature/course.slice";
import userSlice from "./feature/user.slice";

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
  coursesService: ReturnType<typeof coursesService.reducer>;
  communityService: ReturnType<typeof communityService.reducer>;
  walletService: ReturnType<typeof walletService.reducer>;
  userService: ReturnType<typeof userSlice.reducer>;
  reputationService: ReturnType<typeof reputationService.reducer>;
  notificationService: ReturnType<
    typeof notificationsService.reducer
  >;
  scoreboard: ReturnType<typeof scoreboardSlice.reducer>;
  courses: ReturnType<typeof courseSlice.reducer>;
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
    [courseSlice.name]: courseSlice.reducer,
    [communityService.reducerPath]: communityService.reducer,
    [coursesService.reducerPath]: coursesService.reducer,
    [walletService.reducerPath]: walletService.reducer,
    [userService.reducerPath]: userService.reducer,
    [reputationService.reducerPath]: reputationService.reducer,
    [referralsService.reducerPath]: referralsService.reducer,
    [notificationsService.reducerPath]: notificationsService.reducer,
    [scoreboardSlice.name]: scoreboardSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      coursesService.middleware,
      communityService.middleware,
      walletService.middleware,
      userService.middleware,
      reputationService.middleware,
      referralsService.middleware,
      notificationsService.middleware
    );
  },
});

export const wrapper = createWrapper(() => store);

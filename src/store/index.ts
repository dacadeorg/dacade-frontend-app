import { referralSlice } from "./feature/referrals.slice";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { bannerSlice } from "./feature/banner.slice";
import { notificationsSlice } from "./feature/notification.slice";
import { coursesService } from "./services/course.service";
import { communityService } from "./services/community.service";
import { navigationSlice } from "./feature/communities/navigation.slice";
import { submissionsSlice } from "./feature/communities/challenges/submissions";
import { challengeSlice } from "./feature/communities/challenges";
import { feedbackSlice } from "./feature/communities/challenges/submissions/feedback.slice";
import { eventsSlice } from "./feature/events.slice";
import { reputationProfileService } from "./services/profile/reputation.service";

import communities from "./feature/community.slice";
import ui from "./feature/ui.slice";
import indexSlice from "./feature/index.slice";
import authSlice from "./feature/auth.slice";
import userService from "./services/user.service";
import referralsService from "./services/referrals.service";
import notificationsService from "./services/notification.service";
import scoreboardSlice from "./feature/communities/scoreboard.slice";
import courseSlice from "./feature/course.slice";
import userSlice from "./feature/user.slice";
import learningModulesSlice from "./feature/learningModules.slice";
import communitySlice from "./feature/community.slice";
import userProfileSlice from "./feature/profile/users.slice";
import bountiesSlice from "./feature/bouties.slice";
import walletsSlice from "./feature/user/wallets.slice";
import walletsService from "./services/wallets.service";
import profileReducer from "./feature/profile";
import userProfileService from "./services/profile/users.service";
import certificateService from "./services/certificate.service";
import profileCommunitiesService from "./services/profile/profileCommunities.service";
import userReputationService from "./services/user/userReputation.service";
import userReputationSlice from "./feature/user/reputation.slice";
import web3WalletSlice from "./feature/wallet.slice";
import certificateSlice from "./feature/profile/certificate.slice";

export interface IRootState {
  communities: ReturnType<typeof communities.reducer>;
  community: ReturnType<typeof communitySlice.reducer>;
  ui: ReturnType<typeof ui.reducer>;
  referrals: ReturnType<typeof referralSlice.reducer>;
  user: ReturnType<typeof userSlice.reducer>;
  banner: ReturnType<typeof bannerSlice.reducer>;
  notifications: ReturnType<typeof notificationsSlice.reducer>;
  wallets: ReturnType<typeof walletsSlice.reducer>;
  web3Wallet: ReturnType<typeof web3WalletSlice.reducer>;
  store: ReturnType<typeof indexSlice.reducer>;
  auth: ReturnType<typeof authSlice.reducer>;
  coursesService: ReturnType<typeof coursesService.reducer>;
  communityService: ReturnType<typeof communityService.reducer>;
  walletService: ReturnType<typeof walletsService.reducer>;
  userService: ReturnType<typeof userSlice.reducer>;
  userReputations: ReturnType<typeof userReputationSlice.reducer>;
  userReputationService: ReturnType<typeof userReputationService.reducer>;
  userProfileService: ReturnType<typeof userProfileService.reducer>;
  notificationService: ReturnType<typeof notificationsService.reducer>;
  certificateService: ReturnType<typeof certificateService.reducer>;
  reputationProfileService: ReturnType<typeof reputationProfileService.reducer>;
  profileCommunitiesService: ReturnType<typeof profileCommunitiesService.reducer>;
  scoreboard: ReturnType<typeof scoreboardSlice.reducer>;
  bounties: ReturnType<typeof bountiesSlice.reducer>;
  submissions: ReturnType<typeof submissionsSlice.reducer>;
  navigation: ReturnType<typeof navigationSlice.reducer>;
  events: ReturnType<typeof eventsSlice.reducer>;
  challenges: ReturnType<typeof challengeSlice.reducer>;
  courses: ReturnType<typeof courseSlice.reducer>;
  feedback: ReturnType<typeof feedbackSlice.reducer>;
  learningModules: ReturnType<typeof learningModulesSlice.reducer>;
  profile: ReturnType<typeof profileReducer>;
  certificates: ReturnType<typeof certificateSlice.reducer>;
}

export const store = configureStore({
  reducer: {
    [ui.name]: ui.reducer,
    [referralSlice.name]: referralSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [notificationsSlice.name]: notificationsSlice.reducer,
    [bannerSlice.name]: bannerSlice.reducer,
    [walletsSlice.name]: walletsSlice.reducer,
    [indexSlice.name]: indexSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [courseSlice.name]: courseSlice.reducer,
    [navigationSlice.name]: navigationSlice.reducer,
    [submissionsSlice.name]: submissionsSlice.reducer,
    [eventsSlice.name]: eventsSlice.reducer,
    [bountiesSlice.name]: bountiesSlice.reducer,
    [navigationSlice.name]: navigationSlice.reducer,
    [communitySlice.name]: communitySlice.reducer,
    [eventsSlice.name]: eventsSlice.reducer,
    [submissionsSlice.name]: submissionsSlice.reducer,
    [eventsSlice.name]: eventsSlice.reducer,
    [communitySlice.name]: communitySlice.reducer,
    [learningModulesSlice.name]: learningModulesSlice.reducer,
    [userProfileSlice.name]: userProfileSlice.reducer,
    [userReputationSlice.name]: userReputationSlice.reducer,
    [feedbackSlice.name]: feedbackSlice.reducer,
    [challengeSlice.name]: challengeSlice.reducer,
    [web3WalletSlice.name]: web3WalletSlice.reducer,
    [learningModulesSlice.name]: learningModulesSlice.reducer,
    [communityService.reducerPath]: communityService.reducer,
    [coursesService.reducerPath]: coursesService.reducer,
    [certificateService.reducerPath]: certificateService.reducer,
    [walletsService.reducerPath]: walletsService.reducer,
    [reputationProfileService.reducerPath]: reputationProfileService.reducer,
    [profileCommunitiesService.reducerPath]: profileCommunitiesService.reducer,
    [userService.reducerPath]: userService.reducer,
    [userProfileService.reducerPath]: userProfileService.reducer,
    [userReputationService.reducerPath]: userReputationService.reducer,
    [referralsService.reducerPath]: referralsService.reducer,
    [notificationsService.reducerPath]: notificationsService.reducer,
    [scoreboardSlice.name]: scoreboardSlice.reducer,
    [certificateSlice.name]: certificateSlice.reducer,
    profile: profileReducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      coursesService.middleware,
      communityService.middleware,
      walletsService.middleware,
      userService.middleware,
      referralsService.middleware,
      notificationsService.middleware,
      userProfileService.middleware,
      certificateService.middleware,
      reputationProfileService.middleware,
      profileCommunitiesService.middleware,
      userReputationService.middleware
    );
  },
});

export const wrapper = createWrapper(() => store);

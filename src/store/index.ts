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
import { authService } from "./services/auth.service";

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
import userProfileService from "./services/profile/users.service";
import bountiesService from "./services/bounties.service";
import userReferralsSlice from "./feature/user/referrals.slice";
import web3WalletSlice from "./feature/wallet.slice";
import certificateSlice from "./feature/profile/certificate.slice";
import profileCommunitiesService from "./services/profile/profileCommunities.service";
import userReputationService from "./services/user/userReputation.service";
import userReputationSlice from "./feature/user/reputation.slice";
import payoutsSlice from "./feature/user/payouts.slice";
import sumsubVerificationSlice from "./feature/kyc.slice";
import certificateService from "./services/profile/certificate.service";
import teamsSlice from "./feature/teams.slice";
import teamsService from "./services/teams.service";
import invitesSlice from "./feature/communities/challenges/invites.slice";
import challengeService from "@/store/services/communities/challenges";
import scoreboardService from "./services/communities/scoreboard.service";
import communitiesProfile from "./feature/profile/communities.slice";
import reputationSlice from "./feature/profile/reputation.slice";
import { learningModulesService } from "./services/learningModules.service";
import learningMaterialsSlice from "./feature/learningMaterials.slice";

export interface IRootState {
  communities: ReturnType<typeof communities.reducer>;
  community: ReturnType<typeof communitySlice.reducer>;
  ui: ReturnType<typeof ui.reducer>;
  referrals: ReturnType<typeof referralSlice.reducer>;
  userReferrals: ReturnType<typeof userReferralsSlice.reducer>;
  user: ReturnType<typeof userSlice.reducer>;
  banner: ReturnType<typeof bannerSlice.reducer>;
  notifications: ReturnType<typeof notificationsSlice.reducer>;
  wallets: ReturnType<typeof walletsSlice.reducer>;
  web3Wallet: ReturnType<typeof web3WalletSlice.reducer>;
  store: ReturnType<typeof indexSlice.reducer>;
  auth: ReturnType<typeof authSlice.reducer>;
  userReputations: ReturnType<typeof userReputationSlice.reducer>;
  scoreboard: ReturnType<typeof scoreboardSlice.reducer>;
  bounties: ReturnType<typeof bountiesSlice.reducer>;
  submissions: ReturnType<typeof submissionsSlice.reducer>;
  navigation: ReturnType<typeof navigationSlice.reducer>;
  events: ReturnType<typeof eventsSlice.reducer>;
  challenges: ReturnType<typeof challengeSlice.reducer>;
  courses: ReturnType<typeof courseSlice.reducer>;
  feedback: ReturnType<typeof feedbackSlice.reducer>;
  learningModules: ReturnType<typeof learningModulesSlice.reducer>;
  profileCommunities: ReturnType<typeof communitiesProfile.reducer>;
  profileReputation: ReturnType<typeof reputationSlice.reducer>;
  profileUser: ReturnType<typeof userProfileSlice.reducer>;
  profileCertificate: ReturnType<typeof certificateSlice.reducer>;
  certificates: ReturnType<typeof certificateSlice.reducer>;
  sumsubVerification: ReturnType<typeof sumsubVerificationSlice.reducer>;
  payouts: ReturnType<typeof payoutsSlice.reducer>;
  teams: ReturnType<typeof teamsSlice.reducer>;
  invites: ReturnType<typeof invitesSlice.reducer>;
  learningMaterials: ReturnType<typeof learningMaterialsSlice.reducer>
}

export type IRootService = {
  coursesService: ReturnType<typeof coursesService.reducer>;
  communityService: ReturnType<typeof communityService.reducer>;
  walletService: ReturnType<typeof walletsService.reducer>;
  userService: ReturnType<typeof userSlice.reducer>;
  userReputationService: ReturnType<typeof userReputationService.reducer>;
  userProfileService: ReturnType<typeof userProfileService.reducer>;
  notificationService: ReturnType<typeof notificationsService.reducer>;
  certificateService: ReturnType<typeof certificateService.reducer>;
  reputationProfileService: ReturnType<typeof reputationProfileService.reducer>;
  profileCommunitiesService: ReturnType<typeof profileCommunitiesService.reducer>;
  challengeService: ReturnType<typeof challengeService.reducer>;
  scoreboardService: ReturnType<typeof scoreboardService.reducer>;
  authService: ReturnType<typeof authService.reducer>;
  bountiesService: ReturnType<typeof bountiesService.reducer>;
  teamsService: ReturnType<typeof teamsService.reducer>;
  learningModuleService: ReturnType<typeof learningModulesService.reducer>;
  referralsService: ReturnType<typeof referralsService.reducer>;
};

export const reducers = {
  [ui.name]: ui.reducer,
  [referralSlice.name]: referralSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [notificationsSlice.name]: notificationsSlice.reducer,
  [bannerSlice.name]: bannerSlice.reducer,
  [walletsSlice.name]: walletsSlice.reducer,
  [indexSlice.name]: indexSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [authService.reducerPath]: authService.reducer,
  [courseSlice.name]: courseSlice.reducer,
  [navigationSlice.name]: navigationSlice.reducer,
  [submissionsSlice.name]: submissionsSlice.reducer,
  [eventsSlice.name]: eventsSlice.reducer,
  [bountiesSlice.name]: bountiesSlice.reducer,
  [communitySlice.name]: communitySlice.reducer,
  [learningModulesSlice.name]: learningModulesSlice.reducer,
  [userProfileSlice.name]: userProfileSlice.reducer,
  [userReputationSlice.name]: userReputationSlice.reducer,
  [feedbackSlice.name]: feedbackSlice.reducer,
  [challengeSlice.name]: challengeSlice.reducer,
  [web3WalletSlice.name]: web3WalletSlice.reducer,
  [communityService.reducerPath]: communityService.reducer,
  [bountiesService.reducerPath]: bountiesService.reducer,
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
  [userReferralsSlice.name]: userReferralsSlice.reducer,
  [sumsubVerificationSlice.name]: sumsubVerificationSlice.reducer,
  [payoutsSlice.name]: payoutsSlice.reducer,
  [teamsSlice.name]: teamsSlice.reducer,
  [teamsService.reducerPath]: teamsService.reducer,
  [challengeService.reducerPath]: challengeService.reducer,
  [scoreboardService.reducerPath]: scoreboardService.reducer,
  [learningModulesService.reducerPath]: learningModulesService.reducer,
  [invitesSlice.name]: invitesSlice.reducer,
  [communitiesProfile.name]: communitiesProfile.reducer,
  [reputationSlice.name]: reputationSlice.reducer,
  [learningMaterialsSlice.name]: learningMaterialsSlice.reducer,
};

export const middlewares = [
  coursesService.middleware,
  communityService.middleware,
  walletsService.middleware,
  userService.middleware,
  referralsService.middleware,
  notificationsService.middleware,
  userProfileService.middleware,
  bountiesService.middleware,
  certificateService.middleware,
  reputationProfileService.middleware,
  profileCommunitiesService.middleware,
  userReputationService.middleware,
  authService.middleware,
  teamsService.middleware,
  challengeService.middleware,
  scoreboardService.middleware,
  learningModulesService.middleware,
];

export const makeStore = () =>
  configureStore({
    reducer: {
      ...reducers,
    },

    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(...middlewares);
    },
  });

export const wrapper = createWrapper(() => makeStore());

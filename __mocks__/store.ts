import { bannerSlice } from "@/store/feature/banner.slice";
import bountiesSlice from "@/store/feature/bouties.slice";
import challengeSlice from "@/store/feature/communities/challenges";
import invitesSlice from "@/store/feature/communities/challenges/invites.slice";
import { submissionsSlice } from "@/store/feature/communities/challenges/submissions";
import { feedbackSlice } from "@/store/feature/communities/challenges/submissions/feedback.slice";
import { navigationSlice } from "@/store/feature/communities/navigation.slice";
import scoreboardSlice from "@/store/feature/communities/scoreboard.slice";
import communitySlice from "@/store/feature/community.slice";
import courseSlice from "@/store/feature/course.slice";
import indexSlice from "@/store/feature/index.slice";
import sumsubVerificationSlice from "@/store/feature/kyc.slice";
import { notificationsSlice } from "@/store/feature/notification.slice";
import certificateSlice from "@/store/feature/profile/certificate.slice";
import communitiesProfile from "@/store/feature/profile/communities.slice";
import userProfileSlice from "@/store/feature/profile/users.slice";
import { referralSlice } from "@/store/feature/referrals.slice";
import teamsSlice from "@/store/feature/teams.slice";
import userSlice from "@/store/feature/user.slice";
import payoutsSlice from "@/store/feature/user/payouts.slice";
import userReferralsSlice from "@/store/feature/user/referrals.slice";
import userReputationSlice from "@/store/feature/user/reputation.slice";
import walletsSlice from "@/store/feature/user/wallets.slice";
import web3WalletSlice from "@/store/feature/wallet.slice";
// import { authService } from "@/store/services/auth.service";
import bountiesService from "@/store/services/bounties.service";
import challengeService from "@/store/services/communities/challenges";
import scoreboardService from "@/store/services/communities/scoreboard.service";
import { communityService } from "@/store/services/community.service";
import { coursesService } from "@/store/services/course.service";
import notificationsService from "@/store/services/notification.service";
import certificateService from "@/store/services/profile/certificate.service";
import profileCommunitiesService from "@/store/services/profile/profileCommunities.service";
import { reputationProfileService } from "@/store/services/profile/reputation.service";
import userProfileService from "@/store/services/profile/users.service";
import referralsService from "@/store/services/referrals.service";
import teamsService from "@/store/services/teams.service";
import userService from "@/store/services/user.service";
import userReputationService from "@/store/services/user/userReputation.service";
import walletsService from "@/store/services/wallets.service";
import { configureStore } from "@reduxjs/toolkit";

export const makeTestStore = () =>
  configureStore({
    reducer: {
      [referralSlice.name]: referralSlice.reducer,
      [userSlice.name]: userSlice.reducer,
      [notificationsSlice.name]: notificationsSlice.reducer,
      [bannerSlice.name]: bannerSlice.reducer,
      [walletsSlice.name]: walletsSlice.reducer,
      [indexSlice.name]: indexSlice.reducer,
      //   [authSlice.name]: authSlice.reducer,
      //   [authService.reducerPath]: authService.reducer,
      [courseSlice.name]: courseSlice.reducer,
      [navigationSlice.name]: navigationSlice.reducer,
      [submissionsSlice.name]: submissionsSlice.reducer,
      //   [eventsSlice.name]: eventsSlice.reducer,
      [bountiesSlice.name]: bountiesSlice.reducer,
      [communitySlice.name]: communitySlice.reducer,
      //   [learningModulesSlice.name]: learningModulesSlice.reducer,
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
      [invitesSlice.name]: invitesSlice.reducer,
      [communitiesProfile.name]: communitiesProfile.reducer,
      //   [reputationSlice.name]: reputationSlice.reducer,
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
        bountiesService.middleware,
        certificateService.middleware,
        reputationProfileService.middleware,
        profileCommunitiesService.middleware,
        userReputationService.middleware,
        // authService.middleware,
        teamsService.middleware,
        challengeService.middleware,
        scoreboardService.middleware
      );
    },
  });

import { combineReducers } from "@reduxjs/toolkit";
import certificateSlice from "./certificate.slice";
import communitiesProfile from "./communities.slice";
import reputationSlice from "./reputation.slice";
import userProfileSlice from "./users.slice";

/**
 * Profile reducer combined
 * @date 5/9/2023 - 6:07:45 PM
 *
 * @type {*}
 */
const profileReducer = combineReducers({
  certificate: certificateSlice.reducer,
  communities: communitiesProfile.reducer,
  reputations: reputationSlice.reducer,
  user: userProfileSlice.reducer,
});

export default profileReducer;

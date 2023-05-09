import { combineReducers } from "@reduxjs/toolkit";
import certificateSlice from "./certificate.slice";
import communitiesProfile from "./communities.slice";
import reputationSlice from "./reputation.slice";

const profileReducer = combineReducers({
  certificate: certificateSlice.reducer,
  communities: communitiesProfile.reducer,
  reputations: reputationSlice.reducer,
});

export default profileReducer;

import { Submission } from "@/types/bounty";
import { Community } from "@/types/community";
import { Feedback } from "@/types/feedback";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { HYDRATE } from "next-redux-wrapper";

interface InitialState {
  list: Community[];
  current: Community | null;
  feedbacks: Feedback[];
  submissions: Submission[];
  listDataUsername: string;
  reputation: number;
}

const initialState: InitialState = {
  list: [],
  reputation: 0,
  current: null,
  feedbacks: [],
  submissions: [],
  listDataUsername: "",
};

/**
 * Profile communities slice
 * @date 5/9/2023 - 11:18:03 AM
 *
 * @type {*}
 */
const communitiesProfile = createSlice({
  name: "profileCommunities",
  initialState,
  reducers: {
    setCurrentProfileCommunity(state, action: PayloadAction<Community>) {
      state.current = action.payload;
    },
    setListProfileCommunities(state, action: PayloadAction<Community[]>) {
      state.list = action.payload;
    },
    setListDataUsername(state, action: PayloadAction<string>) {
      state.listDataUsername = action.payload;
    },
    setProfileCommunityFeedbacks(state, action: PayloadAction<Feedback[]>) {
      state.feedbacks = action.payload;
    },
    setProfileCommunitySubmissions(state, action) {
      state.submissions = action.payload;
    },
    setProfileCommunityReputation(state, action) {
      state.reputation = action.payload;
    },
    clearProfileCommunity(state) {
      state.list = [];
      state.reputation = 0;
      state.current = null;
      state.feedbacks = [];
      state.submissions = [];
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload["profileCommunities"],
      };
    },
  },
});

export const {
  clearProfileCommunity,
  setCurrentProfileCommunity,
  setProfileCommunityFeedbacks,
  setListProfileCommunities,
  setListDataUsername,
  setProfileCommunityReputation,
  setProfileCommunitySubmissions,
} = communitiesProfile.actions;

export default communitiesProfile;

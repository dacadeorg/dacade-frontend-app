import { Submission } from "@/types/bounty";
import { Community } from "@/types/community";
import { Feedback } from "@/types/feedback";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setColors } from "../ui.slice";

interface InitialState {
  list: Community[];
  current: Community | null;
  feedbacks: Feedback[];
  submissions: Submission[];
  listDataUsername: string[];
  reputation: number;
}

const initialState: InitialState = {
  list: [],
  reputation: 0,
  current: null,
  feedbacks: [],
  submissions: [],
  listDataUsername: [],
};

/**
 * Profile communities slice
 * @date 5/9/2023 - 11:18:03 AM
 *
 * @type {*}
 */
const communitiesProfile = createSlice({
  name: "communities",
  initialState,
  reducers: {
    setCurrentProfileCommunity(state, action: PayloadAction<Community>) {
      setColors(action.payload.colors);
      state.current = action.payload;
    },
    setListProfileCommunity(state, action: PayloadAction<Community[]>) {
      state.list = action.payload;
    },
    setListDataUsername(state, action: PayloadAction<string[]>) {
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
});

export const {
  clearProfileCommunity,
  setCurrentProfileCommunity,
  setProfileCommunityFeedbacks,
  setListProfileCommunity,
  setListDataUsername,
  setProfileCommunityReputation,
  setProfileCommunitySubmissions,
} = communitiesProfile.actions;

export default communitiesProfile;
import api from "@/config/api";
import { Submission } from "@/types/bounty";
import { Community } from "@/types/community";
import { Feedback } from "@/types/feedback";
import {
  combineReducers,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { setColors } from "./ui.slice";

export const profileReputation = createSlice({
  name: "reputation",
  initialState: {
    list: [],
  },
  reducers: {
    setReputationList(state, action) {
      state.list = action.payload;
    },
    clearReputations(state, action) {
      state.list = [];
    },
  },
});

export const { setReputationList, clearReputations } =
  profileReputation.actions;

interface IState {
  list: Community[];
  current: Community | null;
  feedbacks: Feedback[];
  submissions: Submission[];
  listDataUsername: string[];
  reputation: number;
}

const initialState: IState = {
  list: [],
  reputation: 0,
  current: null,
  feedbacks: [],
  submissions: [],
  listDataUsername: [],
};

const communitiesProfile = createSlice({
  name: "communities",
  initialState,
  reducers: {
    setCurrent(state, action: PayloadAction<Community>) {
      setColors(action.payload.colors);
      state.current = action.payload;
    },
    setList(state, action: PayloadAction<Community[]>) {
      state.list = action.payload;
    },
    setListDataUsername(state, action: PayloadAction<string[]>) {
      state.listDataUsername = action.payload;
    },
    setFeedbacks(state, action: PayloadAction<Feedback[]>) {
      state.feedbacks = action.payload;
    },
    setSubmissions(state, action) {
      state.submissions = action.payload;
    },
    setReputation(state, action) {
      state.reputation = action.payload;
    },
    clear(state) {
      state.list = [];
      state.reputation = 0;
      state.current = null;
      state.feedbacks = [];
      state.submissions = [];
    },
  },
});

export const {
  clear,
  setCurrent,
  setFeedbacks,
  setList,
  setListDataUsername,
  setReputation,
  setSubmissions,
} = communitiesProfile.actions;

export default combineReducers({
  communities: communitiesProfile.reducer,
  reputation: profileReputation.reducer,
});

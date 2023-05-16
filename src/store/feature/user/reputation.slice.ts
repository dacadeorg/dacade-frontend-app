import { Reputation } from "@/types/bounty";
import { createSlice } from "@reduxjs/toolkit";

/**
 * Reputation state interface
 *
 */
interface ReputationState {
  list: Reputation[];
}

/**
 * User reputation slice handles reputation state of the current user logged in
 */
const userReputationSlice = createSlice({
  name: "userReputations",
  initialState: {
    list: [],
  } as ReputationState,
  reducers: {
    setUserReputationList(state, action) {
      state.list = action.payload;
    },
    clearUserReputationList(state) {
      state.list = [];
    },
  },
});

export const { clearUserReputationList, setUserReputationList } = userReputationSlice.actions;

export default userReputationSlice;

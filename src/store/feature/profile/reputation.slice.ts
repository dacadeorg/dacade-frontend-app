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
 * Reputation slice handles reputation state for the user on the profile page.
 */
const reputationSlice = createSlice({
  name: "reputations",
  initialState: {
    list: [],
  } as ReputationState,
  reducers: {
    setReputationList(state, action) {
      state.list = action.payload;
    },
    clearReputationList(state) {
      state.list = [];
    },
  },
});

export const { clearReputationList, setReputationList } = reputationSlice.actions;

export default reputationSlice;

import api from "@/config/api";
import { Reputation } from "@/types/bounty";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/**
 * Reputation state interface
 *
 */
interface ReputationState {
  list: Reputation[];
}

/**
 * Reputation slice
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

export const { clearReputationList, setReputationList } =
  reputationSlice.actions;

export default reputationSlice;

import api from "@/config/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/**
 * Reputation state interface
 *
 */
interface ReputationState {
  //TODO This type should be imporved after having the actual reputation type
  list: any;
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

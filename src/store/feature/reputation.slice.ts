import api from "@/plugins/api";
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
    setList(state, action) {
      state.list = action.payload;
    },
    clear(state) {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReputations.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export const { clear, setList } = reputationSlice.actions;

/**
 * Fetch all reputations from API
 */
export const fetchReputations = createAsyncThunk(
  "reputations/fetchAll",
  async (_, { dispatch }) => {
    try {
      const { data } = await api().get("reputations");
      return data;
    } catch (err) {
      dispatch(clear());
    }
  }
);

export default reputationSlice;

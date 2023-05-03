import api from "@/config/api";
import { Submission } from "@/types/bounty";
import { Challenge } from "@/types/course";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ChallengeState {
  current: Challenge | null;
  list: Challenge[];
  submission: Submission | null;
}

const initialState: ChallengeState = {
  current: null,
  list: [],
  submission: null,
};

/**
 * Challenge slice
 * @date 4/18/2023 - 12:00:16 PM
 *
 * @type {*}
 */
const challengeSlice = createSlice({
  name: "challenge",
  initialState,
  reducers: {
    setCurrentChallenge(state, action) {
      state.current = action.payload;
    },
    setChallengesList(state, action) {
      state.list = action.payload;
    },
    setChallengeSubmission(state, action) {
      state.submission = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChallenge.fulfilled, (state, action) => {
        state.current = action.payload;
        state.submission = action.payload.submission;
      })
      .addCase(fetchAllChallenges.fulfilled, (state, action) => {
        state.list = action.payload;
      });
  },
});

export const {
  setCurrentChallenge,
  setChallengesList,
  setChallengeSubmission,
} = challengeSlice.actions;

/**
 * Fetch challenge async action
 * @date 4/18/2023 - 12:00:33 PM
 *
 * @type {*}
 */
export const fetchChallenge = createAsyncThunk(
  "challenges/find",
  async ({ id }: { id: string }) => {
    const { data } = await api().server.get(`challenges/${id}`);
    return data;
  }
);

/**
 * fetch all challenges async action
 * @date 4/18/2023 - 12:00:51 PM
 *
 * @type {*}
 */
export const fetchAllChallenges = createAsyncThunk(
  "challenges/all",
  async ({ slug }: { slug: string }) => {
    const { data } = await api().server.get(
      `/communities/${slug}/challenges`
    );
    return data;
  }
);

export default challengeSlice;

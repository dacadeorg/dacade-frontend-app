import api from "@/config/api";
import { Submission } from "@/types/bounty";
import { Challenge } from "@/types/course";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/**
 * Challenge state interface
 * @date 4/25/2023 - 8:18:04 PM
 *
 * @interface ChallengeState
 * @typedef {ChallengeState}
 */
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
 */
export const challengeSlice = createSlice({
  name: "challenges",
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
        state.submission = action.payload?.submission;
      })
      .addCase(fetchAllChallenges.fulfilled, (state, action) => {
        state.list = action.payload;
      });
  },
});

export const { setCurrentChallenge, setChallengesList, setChallengeSubmission } = challengeSlice.actions;

/**
 * Fetch challenge async action
 * @date 4/18/2023 - 12:00:33 PM
 *
 * @type {*}
 */
export const fetchChallenge = createAsyncThunk("challenges/find", async ({ id, locale, relations }: { id: string; locale?: string; relations?: string[] }) => {
  const { data } = await api(locale).server.get(`challenges/${id}`, {
    params: {
      relations: relations || [],
    },
  });
  return data;
});

/**
 * Fetch the challenge for once the user is logged in
 * The endpoint is challenges/${id} is hit once again as the second one works for authorised user
 * @date 08/10/2023 - 15:40:33 PM
 *
 * @type {*}
 */
export const fetchChallengeAuthenticated = createAsyncThunk(
  "challenges/find",
  async ({ id, locale, relations }: { id: string; locale?: string; relations?: string[] }, { dispatch }) => {
    const { data } = await api(locale).client.get(`challenges/${id}`, {
      params: {
        relations: relations || [],
      },
    });
    dispatch(setChallengeSubmission(data?.submission));
    return data;
  }
);

/**
 * fetch all challenges async action
 * @date 4/18/2023 - 12:00:51 PM
 *
 * @type {*}
 */
export const fetchAllChallenges = createAsyncThunk("challenges/all", async ({ slug }: { slug: string }) => {
  const { data } = await api().server.get(`communities/${slug}/challenges`);
  return data;
});

export const findCommunityChallenge = createAsyncThunk("challenges/all", async ({ slug }: { slug: string }) => {
  const { data } = await api().server.get(`communities/${slug}/challenges`);
  return data;
});

export default challengeSlice.reducer;

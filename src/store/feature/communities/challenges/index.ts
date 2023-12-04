import { Submission } from "@/types/bounty";
import { Challenge } from "@/types/course";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

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
  loading: boolean;
}

const initialState: ChallengeState = {
  current: null,
  list: [],
  submission: null,
  loading: false,
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
      state.current = { ...action.payload, isHackathon: action.payload.type.toUpperCase() === "HACKATHON" };
    },
    setChallengesList(state, action) {
      state.list = action.payload;
    },
    setChallengeSubmission(state, action) {
      state.submission = action.payload;
    },
    setSubmissionLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload["challenges"],
      };
    },
  },
});

export const { setCurrentChallenge, setChallengesList, setChallengeSubmission, setSubmissionLoading } = challengeSlice.actions;

export default challengeSlice;

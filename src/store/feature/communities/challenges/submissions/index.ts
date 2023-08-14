import api from "@/config/api";
import { setCurrentCommunity } from "@/store/feature/community.slice";
import { setCurrentCourse } from "@/store/feature/course.slice";
import { Submission } from "@/types/bounty";
import { setCurrentChallenge } from "..";
import { IRootState } from "@/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

/**
 * Submission state interface
 * @date 4/25/2023 - 8:18:42 PM
 *
 * @interface SubmissionState
 * @typedef {SubmissionState}
 */
interface SubmissionState {
  current: Submission | null;
  list: Submission[];
  text: string;
  submission?: Submission;
}

const initialState: SubmissionState = {
  current: null,
  list: [],
  text: "",
};

export const submissionsSlice = createSlice({
  name: "submissions",
  initialState,
  reducers: {
    setCurrent(state, action: PayloadAction<Submission | null>) {
      state.current = action.payload;
    },
    setSubmissionsList(state, action: PayloadAction<Submission[]>) {
      state.list = action.payload;
    },
    setText(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
    setSubmission: (state, action: PayloadAction<Submission>) => {
      state.submission = action.payload;
    },
    showSubmission: (state, action: PayloadAction<string>) => {
      const current = state.list.find((submission) => submission.id === action.payload);
      state.current = current || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSubmission.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(HYDRATE, (state, action) => {
        return {
          ...state,
          //@ts-ignore
          ...action.payload["submissions"],
        };
      });
  },
});

/**
 * Find submission by id
 * @date 4/25/2023 - 8:19:35 PM
 *
 */

export const findSubmssionById = createAsyncThunk("submissions/find", async ({ id, locale }: { id: string; locale?: string }, { dispatch }) => {
  const { data } = await api(locale).server.get(`submissions/${id}`, {
    params: {
      relations: ["challenge", "evaluation"],
    },
  });
  dispatch(setCurrent(data));
  return data;
});

/**
 * Fetch all submission
 * @date 4/25/2023 - 8:20:21 PM
 *
 * @type {*}
 */
export const fetchAllSubmission = createAsyncThunk(
  "submissions/all",
  async ({ challengeId, startAfter, locale }: { challengeId: string; startAfter?: string; locale?: string }, { getState }) => {
    const state = getState();
    const { data } = await api(locale).server.get(`challenges/${challengeId}/submissions`, {
      params: { start_after: startAfter },
    });
    const list = [];
    if (startAfter) {
      const selectedList = selectList(state as IRootState);
      list.push(...selectedList);
    }
    list.push(...(data || []));
    return list;
  }
);

/**
 * Create a submission
 * @date 4/25/2023 - 8:21:48 PM
 *
 * @type {*}
 */
export const createSubmission = createAsyncThunk(
  "submissions/create",
  async (
    {
      text,
      link,
      challengeId,
      locale,
    }: {
      text: string;
      link: string;
      challengeId: string;
      locale?: string;
    },
    { dispatch }
  ) => {
    const { data } = await api(locale).client.post("submissions/create", {
      challenge_id: challengeId,
      text,
      link,
    });
    dispatch(setSubmission(data));
    return data;
  }
);


/**
 * Create a submission for a team
 * @date 4/25/2023 - 8:21:48 PM
 *
 * @type {*}
 */
export const createSubmissionTeam = createAsyncThunk(
  "submissions/create/team",
  async (
    {
      text,
      link,
      challengeId,
      locale,
    }: {
      text: string;
      link: string;
      challengeId: string;
      locale?: string;
    },
    { dispatch }
  ) => {
    const { data } = await api(locale).server.post("submissions/create/team", {
      challenge_id: challengeId,
      text,
      link,
    });
    dispatch(setSubmission(data));
    return data;
  }
);


/**
 * Find challenge with its relation ["evaluation","course","community"]
 * @date 4/25/2023 - 8:22:20 PM
 *
 * @type {*}
 */
export const findWithRelations = createAsyncThunk("submissions/findWithRelations", async ({ id, locale }: { id: string; locale?: string }, { dispatch }) => {
  const { data } = await api(locale).server.get(`submissions/${id}`, {
    params: {
      relations: ["challenge", "evaluation", "course", "community"],
    },
  });
  dispatch(setCurrent(data));
  dispatch(setCurrentCommunity(data.community));
  dispatch(setCurrentCourse(data.course));
  dispatch(setCurrentChallenge(data.challenge));
  return data;
});

export const { setCurrent, setSubmissionsList, setText, setSubmission, showSubmission } = submissionsSlice.actions;
export const selectCurrent = (state: IRootState) => state.submissions.current;
export const selectList = (state: IRootState) => state.submissions.list;

export default submissionsSlice.reducer;

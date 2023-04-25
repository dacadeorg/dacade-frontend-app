import api from "@/config/api";
import { setCurrentCommunity } from "@/store/feature/community.slice";
import { setCurrentCourse } from "@/store/feature/course.slice";
import { Submission } from "@/types/bounty";
import { setCurrentChallenge } from "..";
import { IRootState } from "@/store";
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

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
    setList(state, action: PayloadAction<Submission[]>) {
      state.list = action.payload;
    },
    setText(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
    setSubmission: (state, action: PayloadAction<Submission>) => {
      state.submission = action.payload;
    },
    show: (state, action: PayloadAction<string>) => {
      const current = state.list.find(
        (submission: Submission) => submission.id === action.payload
      );
      state.current = current || null;
    },
  },
});


/**
 * Find submission by id
 * @date 4/25/2023 - 8:19:35 PM
 *
 * @type {*}
 */
export const findSubmssionById = createAsyncThunk(
  "submissions/find",
  async (
    { id, locale }: { id: string; locale?: string },
    { dispatch }
  ) => {
    const { data } = await api(locale).server.get(
      `submissions/${id}`,
      {
        params: {
          relations: ["challenge", "evaluation"],
        },
      }
    );
    dispatch(setCurrent(data));
    return data;
  }
);


/**
 * Fetch all submission
 * @date 4/25/2023 - 8:20:21 PM
 *
 * @type {*}
 */
export const fetchAllSubmission = createAsyncThunk(
  "submissions/all",
  async (
    {
      challengeId,
      startAfter,
      locale,
    }: { challengeId: string; startAfter?: string; locale?: string },
    { getState, dispatch }
  ) => {
    const state = getState();
    const { data } = await api(locale).server.get(
      `challenges/${challengeId}/submissions`,
      {
        params: { start_after: startAfter },
      }
    );    
    const list = [];
    if (startAfter) {
      const list = selectList(state as IRootState)
      list.push(...list);
    }
    list.push(...(data || []));
    dispatch(setList(list));
    return data;
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
    const { data } = await api(locale).server.post(
      "submissions/create",
      {
        challenge_id: challengeId,
        text,
        link,
      }
    );
    dispatch(setSubmission(data));
    return data;
  }
);


/**
 * Find challenge with it's relation ["evaluation","course","community"]
 * @date 4/25/2023 - 8:22:20 PM
 *
 * @type {*}
 */
export const findWithRelations = createAsyncThunk(
  "submissions/findWithRelations",
  async (
    { id, locale }: { id: string; locale: string },
    { dispatch }
  ) => {
    const { data } = await api(locale).server.get(
      `submissions/${id}`,
      {
        params: {
          relations: [
            "challenge",
            "evaluation",
            "course",
            "community",
          ],
        },
      }
    );
    dispatch(setCurrent(data));
    dispatch(setCurrentCommunity(data.community));
    dispatch(setCurrentCourse(data.course));
    dispatch(setCurrentChallenge(data.challenge));
    return data;
  }
);

export const { setCurrent, setList, setText, setSubmission } =
  submissionsSlice.actions;
export const selectCurrent = (state: IRootState) =>
  state.submissions.current;
export const selectList = (state: IRootState) =>
  state.submissions.list;

export default submissionsSlice.reducer;

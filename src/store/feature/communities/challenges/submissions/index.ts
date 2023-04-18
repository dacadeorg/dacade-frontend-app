import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Submission } from "@/types/bounty";
import api from "@/config/api";
import { setCurrentCommunity } from "@/store/feature/community.slice";
import { setCurrentChallenge } from "..";
import { setCurrentCourse } from "@/store/feature/course.slice";
import { store } from "@/store";

interface SubmissionState {
  current: Submission | null;
  list: Submission[];
}

const initialState: SubmissionState = {
  current: null,
  list: [],
};

const submissionSlice = createSlice({
  name: "submission",
  initialState,
  reducers: {
    setCurrentSubmission(state, action: PayloadAction<Submission>) {
      state.current = action.payload;
    },
    setSubmissionsList(state, action: PayloadAction<Submission[]>) {
      state.list = action.payload;
    },
    setSubmissionText(state, action: PayloadAction<string>) {
      if (state.current) {
        state.current.text = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(findSubmission.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(allSubmissions.fulfilled, (state, action) => {
        const list = state.list;
        const updatedList = action.payload.startAfter
          ? [...list, ...action.payload.data]
          : action.payload.data;
        state.list = updatedList;
      })
      .addCase(createSubmission.fulfilled, (state, action) => {
        state.current = action.payload;
        state.list = [...state.list, ...action.payload];
      })
      .addCase(
        findSubmissionWithRelations.fulfilled,
        (state, action) => {
          state.current = action.payload;
        }
      );
  },
});

export const {
  setCurrentSubmission,
  setSubmissionsList,
  setSubmissionText,
} = submissionSlice.actions;

export const findSubmission = createAsyncThunk(
  "submissions/find",
  async (id: string) => {
    const { data } = await api().server.get<Submission>(
      `submissions/${id}`,
      {
        params: {
          relations: ["challenge", "evaluation"],
        },
      }
    );
    return data;
  }
);

export const showSubmission = createAsyncThunk(
  "submissions/show",
  async (id: string, { dispatch }) => {
    const { list } = store.getState().submission;
    const current = list.find((submission) => submission.id === id);
    dispatch(setCurrentSubmission(current as Submission));
  }
);

export const allSubmissions = createAsyncThunk(
  "submissions/all",
  async ({
    startAfter,
    challengeId,
  }: {
    challengeId: string;
    startAfter: string;
  }) => {
    const { data } = await api().server.get<Submission[]>(
      `challenges/${challengeId}/submissions`,
      {
        params: { start_after: startAfter },
      }
    );
    return { data, startAfter };
  }
);

export const createSubmission = createAsyncThunk(
  "submission/create",
  async ({
    text,
    link,
    challengeId,
  }: {
    text: string;
    link: string;
    challengeId: string;
  }) => {
    const { data } = await api().server.post("submissions/create", {
      challenge_id: challengeId,
      text,
      link,
    });
    return data;
  }
);

export const findSubmissionWithRelations = createAsyncThunk(
  "submission/findWithRelations",
  async ({ id }: { id: string }, { dispatch }) => {
    const { data } = await api().server.get(`submissions/${id}`, {
      params: {
        relations: ["challenge", "evaluation", "course", "community"],
      },
    });
    dispatch(setCurrentCommunity(data.community));
    dispatch(setCurrentCourse(data.course));
    dispatch(setCurrentChallenge(data.challenge));
    return data;
  }
);

export default submissionSlice;

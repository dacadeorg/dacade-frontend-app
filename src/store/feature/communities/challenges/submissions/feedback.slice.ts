import api from "@/config/api";
import { IRootState } from "@/store";
import { createEvent } from "@/store/feature/events.slice";
import { Feedback } from "@/types/feedback";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/**
 * Feedback state interface
 * @date 4/25/2023 - 8:24:37 PM
 *
 * @interface FeedbackState
 * @typedef {FeedbackState}
 */
interface FeedbackState {
  current: Feedback | null;
  list: Feedback[];
}

const initialState: FeedbackState = {
  current: null,
  list: [],
};

export const createFeedback = createAsyncThunk(
  "feedbacks/create",
  async (
    {
      text,
      link,
      submission_id,
      locale,
    }: {
      text: string;
      link: string;
      submission_id: string;
      locale?: string;
    },
    { dispatch, getState }
  ) => {
    const { data: feedback } = await api(locale).client.post("feedbacks/create", {
      submission_id,
      text,
      link,
    });

    dispatch(setCurrent(feedback));
    if (feedback?.id) {
      const state = getState() as IRootState;
      const community = state.communities.current?.slug;
      dispatch(
        createEvent({
          name: "Feedback-created",
          attributes: {
            submissionId: submission_id,
            community,
            feedbackId: feedback.id,
          },
        })
      );
    }
    return feedback;
  }
);
// Define the slice
export const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setCurrent: (state, action) => {
      state.current = action.payload;
    },
    setList: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(findFeedbackById.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.list = action.payload;
      });
  },
});

export const { setCurrent, setList } = feedbackSlice.actions;

/**
 * Find feedback by id
 * @date 4/25/2023 - 8:26:22 PM
 *
 */
export const findFeedbackById = createAsyncThunk("feedback/findById", async ({ id, locale }: { id: string; locale?: string }) => {
  const response = await api(locale).server.get(`feedbacks/${id}`);
  return response.data;
});

/**
 * Fetch feedback by submission id
 * @date 4/25/2023 - 8:29:47 PM
 *
 */
export const fetchFeedbacks = createAsyncThunk("feedback/all", async ({ submissionId, locale }: { submissionId: string; locale?: string }) => {
  const response = await api(locale).server.get(`submissions/${submissionId}/feedbacks`);
  return response.data;
});

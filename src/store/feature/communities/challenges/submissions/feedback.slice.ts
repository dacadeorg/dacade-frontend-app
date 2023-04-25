import api from '@/config/api';
import { Feedback } from '@/types/feedback';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Define the state type
interface FeedbackState {
  current: Feedback | null;
  list: Feedback[];
}

// Define the initial state
const initialState: FeedbackState = {
  current: null,
  list: [],
};

// Define the async thunks
export const findFeedbackById = createAsyncThunk(
  'feedback/findById',
  async ({id , locale}:{id: string , locale: string}) => {
    const response = await api(locale).server.get(
        `feedbacks/${id}`
      );
    return response.data;
  }
);

export const getFeedbacksBySubmissionId = createAsyncThunk(
  'feedback/getBySubmissionId',
  async ({submissionId , locale}: {submissionId: string , locale: string}) => {
    const response = await api(locale).server.get(
        `submissions/${submissionId}/feedbacks`
      );
    return response.data;
  }
);

// Define the slice
export const feedbackSlice = createSlice({
  name: 'feedback',
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
      .addCase(getFeedbacksBySubmissionId.fulfilled, (state, action) => {
        state.list = action.payload;
      });
  },
});

// Export the actions and selectors
export const { setCurrent, setList } = feedbackSlice.actions;

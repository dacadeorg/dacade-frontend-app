import { createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

// Define initial state interface

interface InitialState {
  error: any;
  busy: boolean;
  jobDone: boolean;
  forwardRoute: string | null;
}
// Define initial state
const initialState: InitialState = {
  error: null,
  busy: false,
  jobDone: false,
  forwardRoute: null,
};

// Create a Redux store slice
export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setBusy: (state, action) => {
      state.busy = action.payload;
    },
    setJobDone: (state, action) => {
      state.jobDone = action.payload;
    },
    setForwardRoute: (state, action) => {
      state.forwardRoute = action.payload;
    },
  },
});

// Export actions from the slice
export const {
  setError,
  clearError,
  setBusy,
  setJobDone,
  setForwardRoute,
} = storeSlice.actions;
export default storeSlice;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logEvent, setUserId } from "firebase/analytics";
import { analytics } from "@/config/firebase";
import { store } from "..";

export const createEvent = createAsyncThunk("event/create", async ({ name, attributes }: { name: string; attributes: any }) => {
  const user = store.getState().user.data;
  setUserId(analytics, user && user.uid ? user.uid : null);
  logEvent(analytics, name, attributes || {});
});

export const eventsSlice = createSlice({
  name: "event",
  initialState: {
    colors: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createEvent.fulfilled, (state) => {
      // For state defined later that should be executed after the create event has been fulfilled.
    });
  },
});

export default eventsSlice.reducer;

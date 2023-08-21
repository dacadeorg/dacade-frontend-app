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
});

export default eventsSlice.reducer;

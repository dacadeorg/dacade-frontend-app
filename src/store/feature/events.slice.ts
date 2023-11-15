import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logEvent, setUserId } from "firebase/analytics";
import { analytics } from "@/config/firebase";
import { IRootState } from "..";

/**
 * Create google analytics event
 * @date 11/1/2023 - 2:59:25 PM
 *
 * @type {*}
 */
export const createAnalyticEvent = createAsyncThunk("event/create", async ({ name, attributes }: { name: string; attributes: any }, { getState }) => {
  const store = getState() as IRootState;
  const user = store.user.data;
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

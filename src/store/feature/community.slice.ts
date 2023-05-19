import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Community } from "@/types/community";
import { Course } from "@/types/course";
import api from "@/config/api";

/**
 * CommunitiesState interface
 * @date 4/6/2023 - 11:59:08 AM
 *
 * @export
 * @interface CommunitiesState
 * @typedef {CommunitiesState}
 */
export interface CommunitiesState {
  list: Community[];
  courses: Course[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: object | null | string;
  current: Community | null;
}

/**
 * Initial state initialization
 * @date 4/6/2023 - 11:59:13 AM
 *
 * @type {CommunitiesState}
 */
const initialState: CommunitiesState = {
  list: [],
  courses: [],
  status: "idle",
  error: null,
  current: null,
};

/**
 * Created community slice
 * @date 4/6/2023 - 11:59:18 AM
 *
 * @type {*}
 */
const communitiesSlice = createSlice({
  name: "communities",
  initialState,
  reducers: {
    setAllCommunities: (state, action: PayloadAction<Community[]>) => {
      state.list = action.payload;
    },
    setCurrentCommunity: (state, action: PayloadAction<Community>) => {
      state.current = action.payload;
    },
  },
});

export const { setCurrentCommunity, setAllCommunities } = communitiesSlice.actions;

export default communitiesSlice;

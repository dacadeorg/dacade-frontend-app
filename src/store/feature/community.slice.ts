import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Community } from "@/types/community";
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
    setAll: (state, action: PayloadAction<Community[]>) => {
      state.list = action.payload;
    },
<<<<<<< HEAD
    setCurrentCommunity: (
      state,
      action: PayloadAction<Community>
    ) => {
=======
    setCurrent: (state, action: PayloadAction<Community>) => {
>>>>>>> dev
      state.current = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCommunities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchAllCommunities.fulfilled,
        (state, action: PayloadAction<Community[]>) => {
          state.status = "succeeded";
          state.list = action.payload;
        }
      )
      .addCase(fetchAllCommunities.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchCurrentCommunity.fulfilled, (state, action) => {
        state.current = action.payload;
      });
  },
});
<<<<<<< HEAD
export const { setCurrentCommunity, setAll } =
  communitiesSlice.actions;
=======
export const { setCurrent, setAll } = communitiesSlice.actions;

>>>>>>> dev
/**
 * Fetches all communities from the API.
 * @date 4/6/2023 - 12:09:48 PM
 *
 */
export const fetchAllCommunities = createAsyncThunk(
  "communities/all",
  async ({ locale }: { locale: string }, { rejectWithValue }) => {
    try {
      const { data } = await api(locale).server.get<Community[]>(
        "communities"
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

<<<<<<< HEAD
=======
/**
 * Fetch a community by name
 * @date 4/14/2023 - 1:00:03 PM
 *
 * @type {*}
 */

>>>>>>> dev
export const fetchCurrentCommunity = createAsyncThunk(
  "communities/current",
  async (
    { slug, locale }: { slug: string; locale: string },
<<<<<<< HEAD
    { rejectWithValue, dispatch }
  ) => {
    try {
      const community = await fetchCommunity({ slug, locale });
      dispatch(setCurrentCommunity(community));
      return community;
=======
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api(locale).server.get<Community>(
        `communities/${slug}`
      );
      return data;
>>>>>>> dev
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default communitiesSlice;

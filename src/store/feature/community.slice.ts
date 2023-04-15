import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Community } from "@/types/community";
import {
  fetchCommunities,
  fetchCommunity,
} from "@/services/community";
import { setColors } from "@/store/feature/ui.slice";
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
    setCurrent: (state, action: PayloadAction<Community>) => {
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
      });
  },
});
export const { setCurrent, setAll } = communitiesSlice.actions;
/**
 * Fetches all communities from the API.
 * @date 4/6/2023 - 12:09:48 PM
 *
 */
export const fetchAllCommunities = createAsyncThunk(
  "communities/all",
  async ({ locale }: { locale: string }, { rejectWithValue }) => {
    try {
      const communities = await fetchCommunities({ locale });
      return communities;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCurrentCommunity = createAsyncThunk(
  "communities/current",
  async (
    { slug, locale }: { slug: string; locale: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const community = await fetchCommunity({ slug, locale });
      dispatch(setCurrent(community));
      return community;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default communitiesSlice;
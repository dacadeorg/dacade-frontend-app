import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Community } from "@/types/community";
import { fetchCommunities } from "@/services/community";
import api from "@/config/api";
import { IRootState } from "..";

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
  current?: Community;
  content: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: object | null | string;
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
  content: null,
  error: null,
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
    setCurrentCommunity: (state, action) => {
      state.current = action.payload;
    },
    setContent: (state, action: PayloadAction<any>) => {
      state.content = action.payload;
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
      .addCase(fetchCommunity.fulfilled, (state, action) => {
        state.current = action.payload;
      });
  },
});

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

/**
 * Fetch a community by name
 * @date 4/14/2023 - 1:00:03 PM
 *
 * @type {*}
 */

export const fetchCommunity = createAsyncThunk(
  "communities/find",
  async (slug: string, _) => {
    try {
      const { data } = await api().server.get<Community>(
        `communities/${slug}`
      );
      return data;
    } catch (error) {
      console.error("Failed to fetch community:", error);
    }
  }
);

export const selectList = (state: IRootState) =>
  state.communities.list;
export const selectCurrent = (state: IRootState) =>
  state.communities.current;
export const selectContent = (state: IRootState) =>
  state.communities.content;

export const { setCurrentCommunity } = communitiesSlice.actions;

export default communitiesSlice;

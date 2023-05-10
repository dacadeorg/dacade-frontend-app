import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { User } from "@/types/bounty";

interface InialState {
  current: User | null;
}

const initialState: InialState = {
  current: null,
};

/**
 * Clear profile action
 * @date 5/9/2023 - 10:20:48 AM
 *
 * @type {*}
 */
export const clearProfile = createAsyncThunk(
  "profile/clear",
  async (_, { dispatch }) => {
    // TODO: Will be uncommented after the migration of /store/profile/
    // dispatch(clearCommunities());
  }
);

/**
 * User profile slice
 * @date 5/9/2023 - 10:21:01 AM
 *
 * @type {*}
 */
const userProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setCurrentUserProfile(state, action: PayloadAction<any>) {
      state.current = action.payload;
    },
    clearUserProfile(state) {
      state.current = null;
    },
  },
});

export const { setCurrentUserProfile, clearUserProfile } =
  userProfileSlice.actions;

export default userProfileSlice;
import { auth as firebaseAuth } from "@/config/firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  current: "Hello world!",
};

export default createSlice({
  name: "profile",
  initialState,
  reducers: {
    setCurrent(state, payload) {
      //   state.current = payload;
    },
    clear(state) {
      //   state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.current = "kazuba vanesa!";
    });
  },
});

export const fetchUserProfile = createAsyncThunk(
  "profile/user/fetchUserProfile",
  async (username: string, { dispatch, getState }) => {
    console.log(getState());
    // const { data } = await this.$api.get('users/' + username)
  }
);

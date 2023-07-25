import api from "@/config/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const defaultState = {
  data: null,
};
const searchSlice = createSlice({
  name: "search",
  initialState: defaultState,
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setUserData } = searchSlice.actions;

export const searchUserByUsername = createAsyncThunk("users/search", async (username: string, { dispatch }) => {
  const { data } = await api().client.get(`users/${username}`);
  dispatch(setUserData(data));
  return data;
});

export default searchSlice;

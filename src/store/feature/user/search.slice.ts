import api from "@/config/api";
import { User } from "@/types/bounty";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface SearchData {
  data: User | null;
}

const defaultState: SearchData = {
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
  const { data }: { data: User } = await api().client.get(`users/${username}`);
  dispatch(setUserData(data));
  return data;
});

export default searchSlice;

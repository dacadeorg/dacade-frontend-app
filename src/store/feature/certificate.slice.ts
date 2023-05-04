import api from "@/config/api";
import { Certificate } from "@/types/certificate";
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
// import {
//   createApi,
//   fetchBaseQuery,
// } from "@reduxjs/toolkit/query/react";

interface ICertificateSlice {
  list: Certificate[];
  current: Certificate | null;
  currentMinted: boolean;
}

const initialState: ICertificateSlice = {
  list: [],
  current: null,
  currentMinted: false,
};

export const certificateSlice = createSlice({
  name: "certificates",
  initialState,
  reducers: {
    setCurrent(state, action: PayloadAction<Certificate>) {
      state.current = action.payload;
    },

    setCurrentMintingStatus(state, action: PayloadAction<boolean>) {
      state.currentMinted = action.payload;
    },

    setList(state, action: PayloadAction<Certificate[]>) {
      state.list = action.payload;
    },

    clear(state) {
      state.list = [];
      state.current = null;
    },
  },
});

export const { setCurrent, setList, clear, setCurrentMintingStatus } =
  certificateSlice.actions;

import { Certificate } from "@/types/certificate";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

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

/**
 * Certificate slice
 * @date 5/9/2023 - 6:05:47 PM
 *
 * @type {*}
 */
export const certificateSlice = createSlice({
  name: "profileCertificate",
  initialState,
  reducers: {
    setCurrentCertificate(state, action: PayloadAction<Certificate>) {
      state.current = action.payload;
    },

    setCurrentMintingStatus(state, action: PayloadAction<boolean>) {
      state.currentMinted = action.payload;
    },

    setCertificateList(state, action: PayloadAction<Certificate[]>) {
      state.list = action.payload;
    },

    clearCertificate(state) {
      state.list = [];
      state.current = null;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload["profileCertificate"],
      };
    },
  },
});

export const { setCurrentCertificate, setCertificateList, clearCertificate, setCurrentMintingStatus } = certificateSlice.actions;

export default certificateSlice;

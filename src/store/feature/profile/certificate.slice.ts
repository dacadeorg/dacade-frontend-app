import api from "@/config/api";
import { Certificate } from "@/types/certificate";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  name: "certificates",
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

    clear(state) {
      state.list = [];
      state.current = null;
    },
  },
});

export const { setCurrentCertificate, setCertificateList, clear, setCurrentMintingStatus } = certificateSlice.actions;

export default certificateSlice;

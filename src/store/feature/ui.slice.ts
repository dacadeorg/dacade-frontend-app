import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

interface Color {
  textAccent: string;
  text: string;
  accent: string;
  primary: string;
}
interface UIAction {
  payload: Color | string | boolean;
}

export interface UIState {
  colors: Color;
  locked: boolean;
  showReferralPopup: boolean;
}
// TODO: colors to be initialized when the communities have been initialized
const initialState: UIState = {
  colors: {
    textAccent: "#000000",
    text: "#fff",
    accent: "#A6FA7C",
    primary: "#000000",
  },
  locked: false,
  showReferralPopup: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState as UIState,
  reducers: {
    setColors: (state: UIState, action: UIAction) => {
      state.colors = action.payload as Color;
    },
    setLocked: (state: UIState, action: UIAction) => {
      state.locked = action.payload as boolean;
    },
    setShowReferralPopup: (state: UIState, action: UIAction) => {
      state.showReferralPopup = action.payload as boolean;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
      };
    },
  },
});

export const { setColors, setLocked, setShowReferralPopup } =
  uiSlice.actions;
export default uiSlice;

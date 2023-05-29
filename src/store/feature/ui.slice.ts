import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { IRootState } from "..";
import { Colors } from "@/types/community";

interface UIAction {
  payload: Colors | string | boolean;
}

export interface UIState {
  colors: Colors;
  locked: boolean;
  showReferralPopup: boolean;
}

const initialState: UIState = {
  colors: {} as Colors,
  locked: false,
  showReferralPopup: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState as UIState,
  reducers: {
    setColors: (state: UIState, action: UIAction) => {
      state.colors = action.payload as Colors;
    },
    setLocked: (state: UIState, action: UIAction) => {
      state.locked = action.payload as boolean;
    },
    setShowReferralPopup: (state: UIState, action: UIAction) => {
      state.showReferralPopup = action.payload as boolean;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
      };
    });
  },
});

export const { setColors, setLocked, setShowReferralPopup } = uiSlice.actions;
export default uiSlice;

/**
 * Toggles the scrolling capability of the body.
 * @param {boolean} lock Whether or not to lock the body scrolling.
 */
export const toggleBodyScrolling = (lock: boolean) => (dispatch: any) => {
  const body = document.body;
  dispatch(setLocked(lock));
  if (lock) {
    body.style.top = `-${document.documentElement.scrollTop}px`;
    body.style.position = "fixed";
    body.style.overflowY = "scroll";
    return;
  }
  const scrollTop = parseInt((body.style.top.match(/(\d+)/) || [0])[0] as string);
  body.style.removeProperty("position");
  body.style.removeProperty("top");
  body.style.removeProperty("overflow-y");
  window.scrollTo(0, scrollTop);
};

/**
 * Unlocks the body scrolling if it is currently locked.
 */
export const unlockBodyScrolling = (dispatch: any, state: IRootState) => {
  const locked = state.ui.locked;
  if (locked) {
    dispatch(toggleBodyScrolling(false));
  }
};

/**
 * Toggles the visibility of the referral popup and locks/unlocks the body scrolling accordingly.
 * @param {boolean} show Whether or not to show the referral popup.
 */
export const toggleShowReferralPopup = (show: boolean) => (dispatch: any) => {
  dispatch(toggleBodyScrolling(show));
  dispatch(setShowReferralPopup(show));
};

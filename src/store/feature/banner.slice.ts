import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

// Define initial state
interface AppState {
  showCookiePolicy: boolean;
}

const initialState: AppState = {
  showCookiePolicy: false,
};

// Define slice
export const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    setCookiePolicyVisibility(state, action: PayloadAction<boolean>) {
      state.showCookiePolicy = action.payload;
    },
  },
});

// Define selectors
export const getShowCookiePolicy = (state: AppState) => state.showCookiePolicy;

// Define thunks
export const checkCookiePolicy = () => {
  const cookieRes = document.cookie.includes("privacy-policy-banner");
  if (!cookieRes) {
    return bannerSlice.actions.setCookiePolicyVisibility(true);
  }
  return bannerSlice.actions.setCookiePolicyVisibility(false);
};

export const acceptCookiePolicy = () => {
  document.cookie = `privacy-policy-banner=true; path=/; max-age=${60 * 60 * 24 * 365}`;

  return bannerSlice.actions.setCookiePolicyVisibility(false);
};

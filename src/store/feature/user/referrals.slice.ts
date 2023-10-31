import { Referral } from "@/types/community";
import { createSlice } from "@reduxjs/toolkit";

/**
 * User Referral state interface
 */

interface UserReferralsState {
  userReferralList: Referral[];
  current: Referral | null;
  hasMore: boolean;
}

const initialState: UserReferralsState = {
  userReferralList: [],
  current: null,
  hasMore: true,
};

/**
 * User referral slice
 */

const userReferralsSlice = createSlice({
  name: "userReferrals",
  initialState,
  reducers: {
    setCurrent: (state, action) => {
      state.current = action.payload;
    },
    setUserReferralsList: (state, action) => {
      state.userReferralList = action.payload;
    },
    clear: (state) => {
      state.userReferralList = [];
      state.current = null;
    },
    setHasMoreReferrals: (state, action) => {
      state.hasMore = action.payload;
    },
  },
});

export const { setCurrent, clear, setUserReferralsList, setHasMoreReferrals } = userReferralsSlice.actions;

export default userReferralsSlice;

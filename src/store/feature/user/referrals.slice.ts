import { Referral } from "@/types/community";
import { createSlice } from "@reduxjs/toolkit";

/**
 * User Referral state interface
 */

interface UserReferralsState {
  userReferralList: Referral[];
  current: Referral | null;
}

const initialState: UserReferralsState = {
  userReferralList: [],
  current: null,
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
  },
});

export const { setCurrent, clear, setUserReferralsList } = userReferralsSlice.actions;

export default userReferralsSlice;

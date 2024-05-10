import { Referral } from "@/types/community";
import { createSlice } from "@reduxjs/toolkit";

/**
 * User Referral state interface
 */

interface UserReferralsState {
  userReferralList: Referral[];
  current: Referral | null;
  hasMore: boolean;
  count: number;
  loading: boolean;
}

const initialState: UserReferralsState = {
  userReferralList: [],
  current: null,
  hasMore: true,
  count: 0,
  loading: false,
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

    setCount: (state, action) => {
      state.count = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setCurrent, clear, setUserReferralsList, setHasMoreReferrals, setCount, setLoading } = userReferralsSlice.actions;

export default userReferralsSlice;

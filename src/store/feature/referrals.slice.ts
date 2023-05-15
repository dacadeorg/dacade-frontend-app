import { Referral } from "@/types/community";
import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  list: [],
  filteredList: []
}
/**
 * referral slice.
 * reducers:
 *  - setList
 *  - setFilteredList
 * @date 4/4/2023 - 11:39:17 AM
 */
export const referralSlice = createSlice({
  name: "referrals",
  initialState: defaultState,
  reducers: {
    setReferralsList(state, action) {
      state.list = action.payload;
    },
    setFilteredList(state, action) {
      state.filteredList = action.payload;
    },
  },
});

export const { setReferralsList } = referralSlice.actions;

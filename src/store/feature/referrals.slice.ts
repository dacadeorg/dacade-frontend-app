import { Referral } from "@/types/community";
import { createSlice } from "@reduxjs/toolkit";
import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const defaultState = {
  list: <Referral[]>[],
  filteredList: <Referral[]>[],
};

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
    setList(state, action) {
      state.list = action.payload;
    },
    setFilteredList(state, action) {
      state.filteredList = action.payload;
    },
  },
});

const { setList } = referralSlice.actions;

/**
 * Referral api fetch
 * Endpoint:
 *  - referrals
 * @date 4/4/2023 - 11:42:03 AM
 */
export const referralsApi = createApi({
  reducerPath: "referralsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getReferrals: builder.query({
      query: () => "referrals",
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setList(data));
      },
    }),
  }),
});

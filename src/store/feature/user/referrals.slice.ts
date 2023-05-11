import api from '@/config/api';
import { Referral } from '@/types/community';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IRootState as RootState } from '@/store';


interface UserReferralsState {
  userReferralList: Referral[];
  current: Referral | null;
}

const initialState: UserReferralsState = {
    userReferralList: [],
  current: null,
};


export const userFetchReferrals = createAsyncThunk(
    'referrals/fetchReferralTracking',
    async ({ startAfter }: { startAfter?: string | null }, { getState, dispatch }) => {
      const state: RootState = getState() as RootState;
      const { data } = await api().client.get(`referrals/tracking?start_after=${startAfter}`);
      const list = [];
      if (startAfter) {
        list.push(...(state.referrals.list || []));
      }
      list.push(...(data || []));
      if (!startAfter) {
        dispatch(clear());
      }
      return data;
    }
  );

const userReferralsSlice = createSlice({
  name: 'referrals',
  initialState,
  reducers: {
    setCurrent: (state, action) => {
      state.current = action.payload;
    },
    clear: (state) => {
      state.userReferralList = [];
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userFetchReferrals.fulfilled, (state, action) => {
      const { data, startAfter } = action.payload;
      const list = startAfter ? [...state.userReferralList, ...data] : data;
      state.userReferralList = list;
    });
  },
});

export const { setCurrent, clear } = userReferralsSlice.actions;

export default userReferralsSlice;

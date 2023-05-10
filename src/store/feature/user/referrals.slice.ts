import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IRootState as RootState } from '@/store';
import { Referral } from '@/types/community';

interface ReferralsState {
  userReferralList: Referral[];
  current: Referral | null;
}

const initialState: ReferralsState = {
  userReferralList: [],
  current: null,
};

export const fetchReferrals = createAsyncThunk(
  'referrals/fetchReferrals',
  async (startAfter: string | null, thunkAPI) => {
    try {
      const response = await fetch(`/api/referrals/tracking?start_after=${startAfter}`);
      const data = await response.json();
      return { data, startAfter };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
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
    builder.addCase(fetchReferrals.fulfilled, (state, action) => {
      const { data, startAfter } = action.payload;
      const list = startAfter ? [...state.userReferralList, ...data] : data;
      state.userReferralList = list;
    });
  },
});

export const { setCurrent, clear } = userReferralsSlice.actions;

export const selectCurrentReferral = (state: RootState) => state.referrals.list;
export const selectReferralList = (state: RootState) => state.referrals.list;

export default userReferralsSlice;

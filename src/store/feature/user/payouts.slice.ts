import { createAsyncThunk, createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import api from "@/config/api";
import { fetchAllWallets } from "@/store/services/wallets.service";
import { IRootState } from "@/store";
import { Payout } from "@/types/wallet";

interface PayoutsState {
  current: Payout | null;
  list: Payout[];
}

const initialState: PayoutsState = {
  current: null,
  list: [],
};

const payoutsSlice = createSlice({
  name: "payouts",
  initialState,
  reducers: {
    setCurrent: (state, action: PayloadAction<Payout | null>) => {
      state.current = action.payload;
    },
    setList: (state, action: PayloadAction<Payout[]>) => {
      state.list = action.payload;
    },
    clear: (state) => {
      state.list = [];
    },
  },
});

export const { setCurrent, setList, clear } = payoutsSlice.actions;

/**
 * Async thunk to return all payouts
 * @date 5/22/2023 - 10:43:00 AM
 *
 * @type {*}
 */
export const fetchAllPayouts = createAsyncThunk("payouts/fetchAll", async (_, { dispatch }) => {
  const { data } = await api().client.get("payouts");
  dispatch(setList(data));
});

/**
 * Create a new payout
 * @date 5/22/2023 - 10:44:22 AM
 *
 * @type {*}
 */
export const createPayout = createAsyncThunk("payouts/create", async (payload: { wallet_id: String }, { dispatch }) => {
  await api().server.post(`payouts/create`, payload);
  dispatch(fetchAllPayouts());
  dispatch(fetchAllWallets());
});

export const selectCurrent = (state: IRootState) => state.payouts.current;
export const selectList = (state: IRootState) => state.payouts.list;

export default payoutsSlice;

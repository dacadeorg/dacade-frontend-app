import api from "@/config/api";
import { Bounty } from "@/types/bounty";
import {
  createSlice,
  createAsyncThunk,
  Dispatch,
  PayloadAction,
} from "@reduxjs/toolkit";
import { store } from "..";

interface InitialState {
  bountiesList: Bounty[];
  filteredBountyList: Bounty[];
}

const initialState: InitialState = {
  bountiesList: [],
  filteredBountyList: [],
};

/**
 * Bounty slice
 * @date 5/2/2023 - 1:13:41 PM
 *
 * @type {*}
 */
const bountiesSlice = createSlice({
  name: "bounties",
  initialState,
  reducers: {
    setBountiesList: (state, action: PayloadAction<Bounty[]>) => {
      state.bountiesList = action.payload;
    },
    setFilteredBountiesList: (
      state,
      action: PayloadAction<Bounty[]>
    ) => {
      state.filteredBountyList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllBounties.fulfilled, (state, action) => {
      state.bountiesList = action.payload;
    });
  },
});

/**
 * Fetch bounties actiosn
 * @date 5/2/2023 - 1:14:00 PM
 *
 * @type {AsyncThunk<Bounty, void, AsyncThunkConfig>}
 */
export const fetchAllBounties = createAsyncThunk(
  "bounties/fetchAll",
  async () => {
    const { data } = await api().client.get<Bounty[]>("bounties");
    return data;
  }
);

export const { setBountiesList, setFilteredBountiesList } =
  bountiesSlice.actions;

/**
 * Find bouties by slug
 * @date 5/2/2023 - 1:14:57 PM
 *
 * @param {string} slug
 * @returns {(dispatch: any) => void}
 */
export const findBountiesBySlug =
  (slug: string) => (dispatch: Dispatch) => {
    const allBounties = store.getState().bounties.bountiesList;
    allBounties.filter((bounty) => bounty.slug === slug);
    dispatch(setFilteredBountiesList(allBounties));
  };

export default bountiesSlice;

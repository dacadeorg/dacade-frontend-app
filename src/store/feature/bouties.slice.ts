import { Bounty } from "@/types/bounty";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    setFilteredBountiesList: (state, action: PayloadAction<Bounty[]>) => {
      state.filteredBountyList = action.payload;
    },
  },
});

export const { setBountiesList, setFilteredBountiesList } = bountiesSlice.actions;

/**
 * Find bouties by slug
 * @date 5/2/2023 - 1:14:57 PM
 *
 * @param {string} slug
 * @returns {(dispatch: Dispatch) => void}
 */
export const findBountiesBySlug = (slug: string) => async (dispatch: any) => {
  const allBounties = store.getState().bounties.bountiesList;
  const filteredBounties = allBounties.filter((bounty) => bounty.slug === slug);
  dispatch(setFilteredBountiesList(filteredBounties));
};

export default bountiesSlice;

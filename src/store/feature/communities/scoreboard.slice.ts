import { createSlice } from "@reduxjs/toolkit";
import { IRootState } from "@/store";
import { Scoreboard } from "@/types/scoreboard";
import { HYDRATE } from "next-redux-wrapper";

/**
 * Scoreboard state interface
 * @date 4/12/2023 - 7:58:26 PM
 *
 * @interface State
 * @typedef {State}
 */
interface State {
  list: Scoreboard[];
  loading: boolean;
  filterBy: string;
}

/**
 * Scoreboard defaults state
 * @date 4/12/2023 - 7:57:30 PM
 *
 * @type {State}
 */
const initialState: State = {
  list: [],
  loading: false,
  filterBy: "all",
};

/**
 * Scoreboard slice
 * @date 4/12/2023 - 7:57:10 PM
 *
 * @type {*}
 */
const scoreboardSlice = createSlice({
  name: "scoreboard",
  initialState,
  reducers: {
    setScoreboardList: (state, action) => {
      state.list = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setFilterBy: (state, action) => {
      state.filterBy = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload["scoreboard"],
      };
    },
  },
});

export const { setScoreboardList, setLoading, setFilterBy } = scoreboardSlice.actions;

interface SortScoreboardsArgs {
  sortBy: string;
  list: Scoreboard[];
}

/**
 * Sort action
 * @date 4/12/2023 - 8:00:00 PM
 *
 * @param {string} sortBy
 */
export const sortScoreboards = ({ sortBy, list }: SortScoreboardsArgs): Scoreboard[] => {
  const sortedList = [...list].sort((a, b) => b[sortBy] - a[sortBy]);
  return sortedList;
};

export const selectList = (state: IRootState) => state.scoreboard.list;
export const selectLoading = (state: IRootState) => state.scoreboard.loading;

export default scoreboardSlice;

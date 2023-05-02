// TODO: The async thunk should moved in services
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IRootState } from "@/store";
import api from "@/config/api";
import { Scoreboard } from "@/types/scoreboard";

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllScoreboards.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(fetchAllScoreboards.fulfilled, (state, action) => {
        state.filterBy = "all";
        state.loading = false;
        state.list = action.payload as Scoreboard[];
      })
      .addCase(fetchAllScoreboards.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(filterScoreboards.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(filterScoreboards.fulfilled, (state, action) => {
        state.filterBy = action.payload?.filterBy || "";
        state.loading = false;
        state.list = action.payload?.list as Scoreboard[];
      })
      .addCase(filterScoreboards.rejected, (state, _) => {
        state.loading = false;
      });
  },
});

export const { setScoreboardList, setLoading } = scoreboardSlice.actions;

export const fetchAllScoreboards = createAsyncThunk("communities/scoreboard/all", async ({ slug, locale }: { slug: string; locale: string }) => {
  try {
    const { data } = await api(locale).server.get<Scoreboard[]>(`communities/${slug}/scoreboard`);
    return data;
  } catch (error) {
    console.error(error);
  }
});

interface FilterScoreboardsArgs {
  slug: string;
  filterBy: string;
  sortBy: string;
  locale: string;
}

/**
 * Filter scoreboard slice
 * @date 4/17/2023 - 9:50:15 AM
 *
 * @type {*}
 */

export const filterScoreboards = createAsyncThunk("communities/scoreboard/filter", async ({ slug, filterBy, sortBy, locale }: FilterScoreboardsArgs) => {
  try {
    const { data } = await api(locale).server.get<Scoreboard[]>(`communities/${slug}/scoreboard`, {
      params: {
        "filter-by": filterBy,
      },
    });

    if (sortBy) {
      data.sort((firstItem, secondItem) => secondItem[sortBy] - firstItem[sortBy]);
    }

    return { list: data, filterBy };
  } catch (error) {
    console.error(error);
  }
});

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

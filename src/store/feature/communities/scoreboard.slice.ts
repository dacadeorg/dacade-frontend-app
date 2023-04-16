import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    setList: (state, action: PayloadAction<any[]>) => {
      state.list = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setList, setLoading } = scoreboardSlice.actions;

export const all = (slug: string) => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const { data } = await api().client.get<Scoreboard[]>(
      `communities/${slug}/scoreboard`
    );
    dispatch(setList(data));
    return data;
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

/**
 * Filter action
 * @date 4/12/2023 - 7:59:39 PM
 *
 * @param {string} slug
 * @param {string} filterBy
 * @param {string} sortBy
 * @returns {(dispatch: any) => any}
 */

export const filter =
  (slug: string, filterBy: string, sortBy: string) =>
  async (dispatch: any) => {
    dispatch(setLoading(true));
    try {
      const { data } = await api().client.get<Scoreboard[]>(
        `communities/${slug}/scoreboard`,
        {
          params: {
            "filter-by": filterBy,
          },
        }
      );

      if (sortBy) {
        data.sort((a, b) => b[sortBy] - a[sortBy]);
      }
      dispatch(setList(data));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

/**
 * Sort action
 * @date 4/12/2023 - 8:00:00 PM
 *
 * @param {string} sortBy
 * @returns {(dispatch: any, state: any) => void}
 */
export const sort =
  (sortBy: string) => (dispatch: any, list: Scoreboard[]) => {
    const sortedList = [...list].sort(
      (a, b) => b[sortBy] - a[sortBy]
    );
    dispatch(setList(sortedList));
  };

export const selectList = (state: IRootState) =>
  state.scoreboard.list;
export const selectLoading = (state: IRootState) =>
  state.scoreboard.loading;

export default scoreboardSlice;

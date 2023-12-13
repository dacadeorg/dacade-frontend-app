import { Team } from "@/types/challenge";
import { createSlice } from "@reduxjs/toolkit";

interface DefaultState {
  current: Team | null;
  loading: boolean;
}

const defaultState: DefaultState = {
  current: null,
  loading: false,
};
const teamsSlice = createSlice({
  name: "teams",
  initialState: defaultState,
  reducers: {
    setTeamData: (state, action) => {
      state.current = action.payload;
    },
    setIsTeamDataLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setTeamData, setIsTeamDataLoading } = teamsSlice.actions;

export default teamsSlice;

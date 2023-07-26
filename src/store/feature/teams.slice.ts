import api from "@/config/api";
import { NewTeamOption, Team } from "@/types/challenge";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface DefaultState {
  data: Team;
}

const defaultState: DefaultState = {
  data: {
    challenge_ref: "",
    created_at: "",
    id: "",
    locked: false,
    name: "",
    organizer_id: "",
    ref: "",
    timestamp: "",
    updated_at: "",
  },
};
const teamsSlice = createSlice({
  name: "teams",
  initialState: defaultState,
  reducers: {
    setTeamData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setTeamData } = teamsSlice.actions;

export const searchTeamByChallenge = createAsyncThunk("teams/search", async (challenge_id: string, { dispatch }) => {
  const { data }: { data: Team } = await api().client.get(`/teams/challenge/${challenge_id}`);
  dispatch(setTeamData(data));
  return data;
});

export const createTeam = createAsyncThunk("teams/create", async ({ challenge_id, name, members }: any, { dispatch }) => {
  const { data }: { data: Team } = await api().client.post(`/teams/create`, { challenge_id, name, members });
  dispatch(setTeamData(data));
  return data;
});

export default teamsSlice;

import api from "@/config/api";
import { NewTeamOption, Team } from "@/types/challenge";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface DefaultState {
  current: Team;
}

const defaultState: DefaultState = {
  current: {
    challenge_ref: "",
    created_at: "",
    id: "",
    locked: false,
    name: "",
    organizer_id: "",
    ref: "",
    timestamp: "",
    updated_at: "",
    teamMembers: [],
  },
};
const teamsSlice = createSlice({
  name: "teams",
  initialState: defaultState,
  reducers: {
    setTeamData: (state, action) => {
      state.current = action.payload;
    },
  },
});

export const { setTeamData } = teamsSlice.actions;

export const fetchTeamByChallenge = createAsyncThunk("teams/search", async (challenge_id: string, { dispatch }) => {
  const { data }: { data: Team } = await api().client.get(`/teams/challenge/${challenge_id}`);
  dispatch(setTeamData(data));
  return data;
});

export const createTeam = createAsyncThunk("teams/create", async ({ challenge_id, name, members }: { challenge_id?: string; name: string; members: string[] }, { dispatch }) => {
  const { data }: { data: Team } = await api().client.post(`/teams/create`, { challenge_id, name, members });
  dispatch(setTeamData(data));
  return data;
});

export default teamsSlice;

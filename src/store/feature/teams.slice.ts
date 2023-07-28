import api from "@/config/api";
import { Team } from "@/types/challenge";
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
    invites: [],
  },
};
const teamsSlice = createSlice({
  name: "teams",
  initialState: defaultState,
  reducers: {
    setTeamData: (state, action) => {
      state.current = action.payload;
    },
    setTeamDataAndInvites: (state, action) => {
      state.current = action.payload;
      state.current.invites = action.payload.invites;
    },
  },
});

export const { setTeamData, setTeamDataAndInvites } = teamsSlice.actions;

export const fetchTeamByChallenge = createAsyncThunk("teams/search", async (challenge_id: string, { dispatch }) => {
  const { data }: { data: Team } = await api().client.get(`/teams/challenge/${challenge_id}`);
  dispatch(setTeamData(data));
  return data;
});

export const fetchTeamById = createAsyncThunk("teams/searchById", async (team_id: string, { dispatch }) => {
  const { data }: { data: Team } = await api().client.get(`/teams/${team_id}`);
  dispatch(setTeamData(data));
  return data;
});

export const createTeam = createAsyncThunk("teams/create", async ({ challenge_id, members }: { challenge_id?: string; members: Array<string | undefined> }, { dispatch }) => {
  const { data }: { data: Team } = await api().client.post(`/teams/create`, { challenge_id, members });
  await dispatch(setTeamDataAndInvites(data));

  return data;
});

export default teamsSlice;

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

export default teamsSlice;

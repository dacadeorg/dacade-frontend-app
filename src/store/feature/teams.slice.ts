import api from "@/config/api";
import { User } from "@/types/bounty";
import { Invite, Team } from "@/types/challenge";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface DefaultState {
  current: Team;
}

interface ReturnedInvite {
  invite: Invite;
  member?: User;
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
    teamInvites: [],
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
      const returnedInvites = action.payload.invites.map((invite: ReturnedInvite) => ({ ...invite.invite, user: invite.member }));
      state.current = { ...action.payload.team, teamInvites: returnedInvites };
    },
  },
});

export const { setTeamData, setTeamDataAndInvites } = teamsSlice.actions;

export default teamsSlice;

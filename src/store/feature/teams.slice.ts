import { User } from "@/types/bounty";
import { Invite, Team } from "@/types/challenge";
import { createSlice } from "@reduxjs/toolkit";

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
    members: [],
    teamInvites: [],
  },
};
const teamsSlice = createSlice({
  name: "teams",
  initialState: defaultState,
  reducers: {
    setTeamData: (state, action) => {
      const { locked, members } = action.payload;
      const teamData = { ...action.payload, locked: members.length >= 2 || locked };
      state.current = teamData;
    },
    setTeamDataAndInvites: (state, action) => {
      const returnedInvites = action.payload.invites.map((invite: ReturnedInvite) => ({ ...invite.invite, user: invite.member }));
      state.current = { ...action.payload.team, teamInvites: returnedInvites };
    },
  },
});

export const { setTeamData, setTeamDataAndInvites } = teamsSlice.actions;

export default teamsSlice;

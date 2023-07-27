import api from "@/config/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const defaultState = {};
const invitesSlice = createSlice({
  name: "invites",
  initialState: defaultState,
  reducers: {},
});

export const acceptInvitation = createAsyncThunk("invites/accept", async (invite_id: string, { dispatch }) => {
  const data = await api().client.post(`/teams/accept-invite`, { invite_id });
  return data;
});

export const declineInvitation = createAsyncThunk("invites/decline", async (invite_id: string, { dispatch }) => {
  const { data }: { data: any } = await api().client.post(`/teams/reject-invite`, { invite_id });
  return data;
});

export default invitesSlice;

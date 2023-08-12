import api from "@/config/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const defaultState = {};

/**
 * Team Invites Slice
 * @date 7/31/2023 - 9:50:17 AM
 *
 * @type {*}
 */
const invitesSlice = createSlice({
  name: "invites",
  initialState: defaultState,
  reducers: {},
});

/**
 * Accept team invitation action
 * @date 7/31/2023 - 9:54:18 AM
 *
 * @type {*}
 */
export const acceptInvitation = createAsyncThunk("invites/accept", async (invite_id: string) => {
  const data = await api().client.post(`/teams/accept-invite`, { invite_id });
  return data;
});

/**
 * Decline team invitation action
 * @date 7/31/2023 - 9:54:46 AM
 *
 * @type {*}
 */
export const declineInvitation = createAsyncThunk("invites/decline", async (invite_id: string) => {
  const { data }: { data: any } = await api().client.post(`/teams/reject-invite`, { invite_id });
  return data;
});

export default invitesSlice;

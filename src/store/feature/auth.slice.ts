import { auth as firebaseAuth } from "@/config/firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import api from "@/config/api";

import { clearError, setBusy, setError, setJobDone } from "./index.slice";
import { IRootState } from "..";
import { User } from "@/types/bounty";
import { fetchUser } from "../services/user.service";

// Define the interface for the auth state
interface AuthState {
  data: User | null;
  userBalance: number | null;
  balance: number | null;
  walletAddresses: string[] | null;
  isAuthLoading: boolean;
  isVerificationInProgress: boolean;
}

// Define the initial state
const initialState: AuthState = {
  data: null,
  userBalance: null,
  balance: null,
  walletAddresses: null,
  isAuthLoading: false,
  isVerificationInProgress: true,
};

// Define the auth slice using Redux Toolkit
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData(state, action) {
      state.data = action.payload;
    },
    clearAuthData(state) {
      state.data = null;
    },
    setIsAuthLoading(state, action) {
      state.isAuthLoading = action.payload;
    },
    setIsVerificationInProgress(state, action) {
      state.isVerificationInProgress = action.payload;
    },
  },
});

export const authCheck = (state: IRootState) => state.auth.data !== null && state.auth.data !== undefined;

export const authVerify = (state: IRootState) => authCheck(state) && (state.auth.data?.emailVerified as boolean);

// Export the auth actions
export const { setAuthData, clearAuthData, setIsAuthLoading, setIsVerificationInProgress } = authSlice.actions;
export default authSlice;

// Define the login async thunks using Redux Toolkit
export const login = createAsyncThunk("login", async (payload: { email: string; password: string }, { dispatch }) => {
  dispatch(setBusy(true));
  dispatch(clearError());

  try {
    dispatch(clearAuthData());
    await signInWithEmailAndPassword(firebaseAuth, payload.email, payload.password);
    await dispatch(fetchUser());
    dispatch(setJobDone(true));
    dispatch(setBusy(false));
  } catch (error) {
    dispatch(setAuthData(null));
    dispatch(setBusy(false));
    dispatch(setError(error));
    throw error;
  }
});

// Define the login async thunks using Redux Toolkit
export const passwordResetRequest = createAsyncThunk("passwordReset/request", async (payload: { email: string }, { dispatch }) => {
  dispatch(setBusy(true));
  dispatch(clearError());

  try {
    const response = await sendPasswordResetEmail(firebaseAuth, payload.email);
    dispatch(setJobDone(true));
    dispatch(setBusy(false));
    return response;
  } catch (error) {
    dispatch(setBusy(false));
    dispatch(setError(error));
    throw error;
  }
});

// Define the logout async thunks
export const logout = createAsyncThunk("logout", async (_, { dispatch }) => {
  await signOut(firebaseAuth);
  dispatch(clearAuthData());
});

// Discord Disconnect
export const disconnectDiscord = () => async () => {
  const user = firebaseAuth?.currentUser;
  if (user) {
    try {
      const { data } = await api().client.post("auth/discord/disconnect");
      return data;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
};

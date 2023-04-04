import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { auth as firebaseAuth } from "@/plugins/firebase";
import api from "@/plugins/api";
import {
  clearError,
  setBusy,
  setError,
  setJobDone,
} from "./index.slice";
import { fetchUser } from "./user.slice";

// Define the interface for the auth state
interface AuthState {
  data: Record<string, unknown> | null;
  userBalance: number | null;
  balance: number | null;
  walletAddresses: string[] | null;
}

// Define the initial state
const initialState: AuthState = {
  data: null,
  userBalance: null,
  balance: null,
  walletAddresses: null,
};

// Define the auth slice using Redux Toolkit
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData(
      state,
      action: PayloadAction<Record<string, unknown> | null>
    ) {
      state.data = action.payload;
    },
    clearAuthData(state) {
      state.data = null;
    },
  },
});

// Export the auth actions
export const { setAuthData, clearAuthData } = authSlice.actions;

// Define the sing up async thunks using Redux Toolkit
export const singUp = createAsyncThunk(
  "",
  async (
    payload: { email: string; password: string },
    { dispatch }
  ) => {
    dispatch(setBusy(true));
    dispatch(clearError());
    try {
      const user = await api().post("auth/signup", {
        ...payload,
        redirectLink: "/communities",
      });
      //   dispatch(createEvent("user-signed-up", { userId: user.uid }));
      dispatch(
        login({ email: payload.email, password: payload.password })
      );
    } catch (error) {
      dispatch(setError(error));
      dispatch(setBusy(false));
      throw error;
    }
  }
);

// Define the login async thunks using Redux Toolkit
export const login = createAsyncThunk(
  "",
  async (
    payload: { email: string; password: string },
    { dispatch }
  ) => {
    dispatch(setBusy(true));
    dispatch(clearError());

    try {
      dispatch(clearAuthData());
      await signInWithEmailAndPassword(
        firebaseAuth,
        payload.email,
        payload.password
      );
      await dispatch(fetchUser());
      dispatch(setJobDone(true));
      dispatch(setBusy(false));
    } catch (error) {
      dispatch(setAuthData(null));
      dispatch(setBusy(false));
      dispatch(setError(error));
      throw error;
    }
  }
);

// Define the login async thunks using Redux Toolkit
export const passwordResetRequest = createAsyncThunk(
  "",
  async (payload: { email: string }, { dispatch }) => {
    dispatch(setBusy(true));
    dispatch(clearError());

    try {
      const response = await sendPasswordResetEmail(
        firebaseAuth,
        payload.email
      );
      dispatch(setJobDone(true));
      dispatch(setBusy(false));
      return response;
    } catch (error) {
      dispatch(setBusy(false));
      dispatch(setError(error));
      throw error;
    }
  }
);

// Define the logout async thunks
export const logout = createAsyncThunk(
  "",
  async (_, { dispatch }) => {
    await signOut(firebaseAuth);
    dispatch(clearAuthData());
  }
);

// Define the resend email verfication
export const resendEmailVerification = async () => {
  const res = await api().get("auth/send-verification-email");
  return res;
};

// Define the verify email
export const verifyEmail = createAsyncThunk(
  "",
  async (payload: { code: string }) => {
    const res = await api().post("auth/verify-email", payload);
    return res;
  }
);

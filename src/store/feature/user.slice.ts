import api from "@/plugins/api";
import { auth as firebaseAuth } from "@/plugins/firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "@/types/bounty";

interface DefaultState {
  data: User | null;
  userBalance: string | null;
  balance: string | null;
  walletAddresses: string | null;
  token: string | null;
}

const defaultState: DefaultState = {
  data: null,
  userBalance: null,
  balance: null,
  walletAddresses: null,
  token: null,
};

export const clearState = createAsyncThunk(
  "user/clear",
  async (_, { dispatch }) => {
    dispatch(clearNotifications());
    dispatch(clearReputations());
    dispatch(clearWallets());
    dispatch(clearAuth());
  }
);

export const fetchUser = createAsyncThunk(
  "user/fetch",
  async (_, { dispatch }) => {
    const token = getUserToken();
    if (!token) {
      dispatch(clear());
      return null;
    }

    try {
      await dispatch(getToken());
      const { data } = await api().get("users/current");
      return data;
    } catch (e) {
      dispatch(clear());
      return null;
    }
  }
);

export const update = createAsyncThunk(
  "user/update",
  async (payload, { dispatch }) => {
    await api().patch("users/update", payload);
    dispatch(fetchUser());
  }
);

export const getUserToken = async () => {
  const user = firebaseAuth.currentUser;
  const token = await user?.getIdToken();
  return token;
};

export const getToken = createAsyncThunk(
  "user/getToken",
  async (_, { dispatch }) => {
    const token = await getUserToken();

    try {
      if (!token) throw new Error("Couldn't fetch the token");
      dispatch(setToken(token));
      return token;
    } catch (e) {
      console.log(e);
      dispatch(clear());
      return null;
    }
  }
);

export const clearNotifications = () => {
  return {
    type: "user/notifications/clear",
  };
};

export const clearReputations = () => {
  return {
    type: "user/reputations/clear",
  };
};

export const clearWallets = () => {
  return {
    type: "user/wallets/clear",
  };
};

export const clearAuth = () => {
  return {
    type: "auth/clear",
  };
};

const userSlice = createSlice({
  name: "user",
  initialState: defaultState,
  reducers: {
    clear: (state) => {
      state.data = null;
      state.token = null;
    },

    set: (state, action) => {
      state.data = action.payload;
    },

    setToken: (state, action) => {
      state.token = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(clearState.fulfilled, (state) => {
        state = defaultState;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export const { clear, set, setToken } = userSlice.actions;
export default userSlice;

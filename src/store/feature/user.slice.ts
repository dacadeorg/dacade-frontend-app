import api from "@/config/api";
import { auth as firebaseAuth } from "@/config/firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "@/types/bounty";

/**
 * The default state for the user slice.
 * @typedef {Object} DefaultState
 * @property {User|null} data - The current user data or null if no user is logged in.
 * @property {string|null} userBalance - The user's balance or null if the user is not logged in.
 * @property {string|null} balance - The user's balance or null if the user is not logged in.
 * @property {string|null} walletAddresses - The user's wallet addresses or null if the user is not logged in.
 * @property {string|null} token - The user's token or null if the user is not logged in.
 */
interface DefaultState {
  data: User | null;
  userBalance: string | null;
  balance: string | null;
  walletAddresses: string | null;
  token: string | null;
}

/**
 * The default state for the user slice.
 * @type {DefaultState}
 */
const defaultState: DefaultState = {
  data: null,
  userBalance: null,
  balance: null,
  walletAddresses: null,
  token: null,
};

/**
 * An async action creator that clears all user state.
 * @type {AsyncThunk<undefined, undefined, {}>}
 */
export const clearState = createAsyncThunk(
  "user/clear",
  async (_, { dispatch }) => {
    dispatch(clearNotifications());
    dispatch(clearReputations());
    dispatch(clearWallets());
    dispatch(clearAuth());
  }
);

/**
 * An async action creator that fetches the current user data.
 * @type {AsyncThunk<User|null, undefined, {}>}
 */
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
      const { data } = await api().client.get("users/current");
      return data;
    } catch (e) {
      dispatch(clear());
      return null;
    }
  }
);

/**
 * An async action creator that updates the user's data.
 * @type {AsyncThunk<undefined, any, {}>}
 */
export const update = createAsyncThunk(
  "user/update",
  async (payload, { dispatch }) => {
    await api().client.patch("users/update", payload);
    dispatch(fetchUser());
  }
);

/**
 * Function that gets the current user's token.
 * @returns {Promise<string|null>} The current user's token or null if the user is not logged in.
 */
export const getUserToken = async () => {
  const user = firebaseAuth.currentUser;
  const token = await user?.getIdToken();
  return token;
};

/**
 * An async action creator that gets the current user's token and sets it in the state.
 * @type {AsyncThunk<string|null, undefined, {}>}
 */
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

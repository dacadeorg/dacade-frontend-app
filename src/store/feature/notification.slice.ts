import api from "@/config/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Notification } from "@/types/notification";

interface NotificationState {
  notifications: Notification[];
  count: number;
  unread: number;
}

const initialState: NotificationState = {
  notifications: [],
  count: 0,
  unread: 0,
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload.list;
      state.count = action.payload.list.length;
    },
    setUnreadNotifications: (state, action) => {
      state.unread = action.payload.unread;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllNotifications.fulfilled,
      (state, action) => {
        state.notifications = action.payload.list;
        state.count = action.payload.list.length;
        state.unread = action.payload.unread;
      }
    );
  },
});

export const {
  clearNotifications,
  setNotifications,
  setUnreadNotifications,
} = notificationsSlice.actions;

export const fetchAllNotifications = createAsyncThunk(
  "notifications/all",
  async (_, { dispatch }) => {
    try {
      const { data } = await api().client.get<{
        list: Notification[];
        unread: number;
      }>("notifications");
      dispatch(setNotifications({ list: data.list }));
      return { list: data.list, unread: data.unread };
    } catch (error) {
      dispatch(clearNotifications());
      throw error;
    }
  }
);

export const readNotification = createAsyncThunk(
  "notifications/read",
  async (_, { dispatch }) => {
    try {
      await api().client.post("notifications/read");
      dispatch(fetchAllNotifications());
    } catch (error) {
      console.error(error);
    }
  }
);

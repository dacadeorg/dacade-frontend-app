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
    builder.addCase(allNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload.list;
      state.count = action.payload.list.length;
      state.unread = action.payload.unread;
    });
  },
});

export const {
  clearNotifications,
  setNotifications,
  setUnreadNotifications,
} = notificationsSlice.actions;

export const allNotifications = createAsyncThunk(
  "notifications/all",
  async (_, { dispatch }) => {
    try {
      const { data } = await api().get<{
        list: Notification[];
        unread: number;
      }>("notifications");
      dispatch(clearNotifications());
      return { list: data.list, unread: data.unread };
    } catch (error) {
      console.error(error);
      dispatch(clearNotifications());
      throw error;
    }
  }
);

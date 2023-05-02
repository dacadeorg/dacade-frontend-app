import { createSlice } from "@reduxjs/toolkit";
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
});

export const { clearNotifications, setNotifications, setUnreadNotifications } = notificationsSlice.actions;

import { createSlice } from "@reduxjs/toolkit";
import { Notification } from "@/types/notification";

/**
 * Notification interface
 * @date 5/2/2023 - 6:08:25 PM
 *
 * @interface NotificationState
 * @typedef {NotificationState}
 */
interface NotificationState {
  notifications: Notification[];
  count: number;
  unread: number;
}

/**
 * Notification initial state
 * @date 5/2/2023 - 6:08:06 PM
 *
 * @type {NotificationState}
 */
const initialState: NotificationState = {
  notifications: [],
  count: 0,
  unread: 0,
};

/**
 * Notifications slice
 * @date 5/2/2023 - 6:07:50 PM
 *
 * @type {*}
 */
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

export const {
  clearNotifications,
  setNotifications,
  setUnreadNotifications,
} = notificationsSlice.actions;

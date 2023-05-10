import baseQuery from "@/config/baseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query";
import { clearNotifications, setNotifications } from "../feature/notification.slice";

/**
 * Get notifications result type
 * @date 4/18/2023 - 10:25:26 AM
 *
 * @interface GetNotificationResult
 * @typedef {GetNotificationResult}
 */
interface GetNotificationResult {
  list: Notification[];
  unread: number;
}

/**
 * Notifications api service
 * @date 4/18/2023 - 10:21:52 AM
 * @type {*}
 */
const notificationsService = createApi({
  reducerPath: "notificationsService",
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    /**
     * Get all notifications endpoint
     * @method GET
     */
    getAllNotifications: builder.query<GetNotificationResult, any>({
      query: () => "notifications",
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setNotifications({ list: data.list }));
        } catch (error) {
          dispatch(clearNotifications());
        }
      },
    }),

    /**
     * Read notification endpoint
     * @method POST
     * @enpoint notifications/read
     */
    readNotification: builder.mutation({
      query: () => ({
        url: "notifications/read",
        method: "POST",
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(notificationsService.endpoints.getAllNotifications.initiate("en"));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

/**
 * Fetch all notifications function
 * @date 4/18/2023 - 10:24:49 AM
 *
 * @returns {*}
 */
export const fetchAllNotifications = () => notificationsService.endpoints.getAllNotifications.initiate("");

/**
 * Read notification function
 * @date 4/18/2023 - 10:25:06 AM
 *
 * @returns {*}
 */
export const readNotification = () => notificationsService.endpoints.readNotification.initiate("");

export default notificationsService;

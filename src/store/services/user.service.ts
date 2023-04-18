import baseQuery from "@/config/baseQuery";
import {
  clearUserState,
  getUserToken,
  setUserToken,
  setUserdata,
} from "../feature/user.slice";
import { User } from "@/types/bounty";
import { createApi } from "@reduxjs/toolkit/dist/query";

/**
 * User API service
 * @date 4/17/2023 - 7:31:21 PM
 *
 * @type {*}
 */
const userService = createApi({
  reducerPath: "userService",
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    /**
     * Get user endpoint
     * @method GET
     */
    getUser: builder.query<User, any>({
      query: () => "users/current",
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        const token = await getUserToken();
        if (!token) dispatch(clearUserState());
        else {
          dispatch(setUserToken(token));
          dispatch(setUserdata(data));
        }
      },
    }),

    /**
     * Update user endpoint
     * @method PATCH
     * @query {payload}
     */
    updateUser: builder.mutation<any, User>({
      query: (payload: User) => ({
        url: "users/update",
        method: "PATCH",
        body: payload,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(userService.endpoints.getUser.initiate("sp"));
      },
    }),
  }),
});

/**
 * Get user function
 */
export const getUser = () =>
  userService.endpoints.getUser.initiate("en");

/**
 * Update user function
 * @param user
 * @returns
 */
export const updateUser = (user: User) =>
  userService.endpoints.updateUser.initiate(user);

export default userService;

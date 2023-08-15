import baseQuery from "@/config/baseQuery";
import { clearUserState, getUserToken, fetchingUserLoading, setUserToken, setUserdata, setSearchUserdata } from "../feature/user.slice";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

/**
 * User interface for payload request payload
 * @date 5/3/2023 - 12:29:14 PM
 *
 * @interface User
 * @typedef {User}
 */
interface User {
  firstName: string;
  lastName: string;
}

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
    getUser: builder.query({
      query: () => "users/current",
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        dispatch(fetchingUserLoading(true));
        try {
          const { data } = await queryFulfilled;
          const token = await getUserToken();
          if (!token) dispatch(clearUserState());
          else {
            dispatch(setUserToken(token));
            dispatch(setUserdata(data));
          }
          return data;
        } catch (err) {
          console.error(err);
        } finally {
          dispatch(fetchingUserLoading(false));
        }
      },
    }),

    /**
     * Get user by username endpoint, we search by username
     * @method GET
     */
    getUserByUsername: builder.query({
      query: (username: string) => ({
        url: `/users/search/${username}`,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setSearchUserdata(data));
        return data;
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

export const { useGetUserQuery, useGetUserByUsernameQuery } = userService;

/**
 * Get user function
 */
export const fetchUser = () => userService.endpoints.getUser.initiate("en");

/**
 * Update user function
 * @param user
 * @returns
 */
export const updateUser = async (user: { firstName: string; lastName: string }) => await userService.endpoints.updateUser.initiate(user);

export const getUserByUsername = (username: string) => userService.endpoints.getUserByUsername.initiate(username);

export default userService;

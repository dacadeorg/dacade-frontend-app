import baseQuery from "@/config/baseQuery";
import {
  clearUserState,
  getUserToken,
  setUserToken,
  setUserdata,
} from "../feature/user.slice";
import { User } from "@/types/bounty";
import { createApi } from "@reduxjs/toolkit/dist/query";

const userService = createApi({
  reducerPath: "userService",
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    getUser: builder.query({
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

    updateUser: builder.mutation({
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

export const getUser = () =>
  userService.endpoints.getUser.initiate("en");
export const updateUser = (user: User) =>
  userService.endpoints.updateUser.initiate(user);
export default userService;

import baseQuery from "@/config/baseQuery";
import { store } from "@/store";
import {
  clearProfile,
  setCurrentUserProfile,
} from "@/store/feature/profile/users.slice";
import { createApi } from "@reduxjs/toolkit/query";

const userProfileService = createApi({
  reducerPath: "profileService",
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    fetchUserProfile: builder.query({
      query: (username: string) => `users/${username}`,
      onQueryStarted: async (
        username: string,
        { dispatch, queryFulfilled }
      ) => {
        try {
          const { data } = await queryFulfilled;
          const current = store.getState().profile.user.current;
          if (!current || current?.username !== username) {
            dispatch(clearProfile());
          }
          dispatch(setCurrentUserProfile(data));
        } catch (error) {
          console.error(error);
          dispatch(clearProfile());
        }
      },
    }),
  }),
});

export default userProfileService;

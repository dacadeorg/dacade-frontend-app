import baseQuery from "@/config/baseQuery";
import { clearProfile, setCurrentUserProfile } from "@/store/feature/profile/users.slice";
import { User } from "@/types/bounty";
import { createApi } from "@reduxjs/toolkit/query";

const userProfileService = createApi({
  reducerPath: "profileService",
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    fetchUserProfile: builder.query({
      query: (username: string) => {
        return `users/${username}`;
      },

      onQueryStarted: async (username: string, { dispatch, queryFulfilled, getState }) => {
        try {
          const state: any = getState();
          const current: User = state.profileUser.current;
          if (current?.username.toLocaleLowerCase() !== username.toLocaleLowerCase()) {
            dispatch(clearProfile());
          }
          const { data } = await queryFulfilled;
          dispatch(setCurrentUserProfile(data));
        } catch (error) {
          console.error(error);
          dispatch(clearProfile());
        }
      },
    }),
  }),
});

export const fetchUserProfile = (username: string) => userProfileService.endpoints.fetchUserProfile.initiate(username);

export default userProfileService;

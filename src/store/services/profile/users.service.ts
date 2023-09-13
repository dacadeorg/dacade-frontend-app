import baseQuery from "@/config/baseQuery";
import { store } from "@/store";
import { clearProfile, setCurrentUserProfile } from "@/store/feature/profile/users.slice";
import { createApi } from "@reduxjs/toolkit/query";

const userProfileService = createApi({
  reducerPath: "profileService",
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    fetchUserProfile: builder.query({
      query: (username: string) => {
        const current = store.getState().profileUser.current;
        if (current?.username.toLocaleLowerCase() !== username.toLocaleLowerCase()) {
          console.log("cleared");
          store.dispatch(clearProfile());
        }
        return `users/${username}`;
      },

      onQueryStarted: async (username: string, { dispatch, queryFulfilled }) => {
        try {
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

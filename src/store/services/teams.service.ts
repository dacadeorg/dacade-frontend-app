import baseQuery from "@/config/baseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { setTeamData, setTeamDataAndInvites } from "../feature/teams.slice";

interface CreateTeamPayload {
  challenge_id?: string;
  members: Array<string | undefined>;
}

const teamsService = createApi({
  reducerPath: "teamsService",
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    getTeamByChallenge: builder.query({
      query: (challengeId: string) => ({
        url: `/teams/challenge/${challengeId}`,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setTeamData(data));
        return data;
      },
    }),
    getTeamById: builder.query({
      query: (teamId: string) => ({
        url: `/teams/${teamId}`,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setTeamData(data));
        return data;
      },
    }),

    createTeam: builder.mutation<CreateTeamPayload, any>({
      query: (payload: CreateTeamPayload) => ({
        url: `/teams/create`,
        method: "POST",
        body: payload,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;

        console.log("This is the data int the service", data);
        dispatch(setTeamDataAndInvites(data));
      },
    }),
  }),
});
export const { useGetTeamByChallengeQuery, useGetTeamByIdQuery } = teamsService;

export const getTeamByChallenge = (challengeId: string) => teamsService.endpoints.getTeamByChallenge.initiate(challengeId);

export const getTeamById = (challengeId: string) => teamsService.endpoints.getTeamById.initiate(challengeId);
export default teamsService;

export const createTeam = (payload: CreateTeamPayload) => teamsService.endpoints.createTeam.initiate(payload);

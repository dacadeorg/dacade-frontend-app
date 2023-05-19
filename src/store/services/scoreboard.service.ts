import baseQuery from "@/config/baseQuery";
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BaseQueryApi, BaseQueryFn, EndpointDefinitions, createApi } from "@reduxjs/toolkit/dist/query/react";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { setFilterBy, setLoading, setScoreboardList } from "../feature/communities/scoreboard.slice";

export const scoreboardService = createApi({
    reducerPath: 'scoreboardService',
    baseQuery: baseQuery(),
    endpoints: (builder) => ({
        getScoreboards: builder.query({
            query: (locale?: string) => ({
                url: `/scoreboard`,
                headers: {
                    "accept-language": locale,
                }
            })
        }),
        getFilteredScoreboard: builder.query({
            query: ({locale, slug, filterBy, sortBy}: {locale?: string; slug: string,filterBy: string, sortBy: string }) => ({
                url: `/scoreboard/${slug}/scoreboard?filter-by=${filterBy}`,
                headers: {
                    "accept-language": locale,
                }
            }),
            onQueryStarted: async ({sortBy}:{sortBy: string}, {dispatch, queryFulfilled}) => {
                try{
    dispatch(setLoading(true));
    const {data} = await queryFulfilled;
    dispatch(setFilterBy(sortBy))
    dispatch(setScoreboardList(data));

}catch(err){
dispatch(setLoading(false))
            }
finally{
                dispatch(setLoading(false));
            }
        }
            
        })
    })
})

export const fetchAllScoreboards = (locale?: string) => scoreboardService.endpoints.getScoreboards.initiate(locale);

export const filterScoreboards = ({ slug, locale }: { slug: string; locale?: string }) => {
    return scoreboardService.endpoints.getFilteredScoreboard.initiate({
        locale,
        slug,
    })
}

export const {useGetScoreboardQuery} = scoreboardService;

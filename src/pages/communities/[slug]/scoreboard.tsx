import { ReactElement, useEffect } from "react";
import CommunityWrapper from "@/components/sections/communities/overview/Wrapper";
import Scoreboard from "@/components/sections/communities/overview/scoreboard";
import ScoreboardFilter from "@/components/sections/communities/overview/scoreboard/Filter";
import { getMetadataDescription, getMetadataTitle } from "@/utilities/Metadata";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { fetchAllScoreboards, setScoreboardList } from "@/store/feature/communities/scoreboard.slice";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { GetServerSideProps } from "next";
import i18Translate from "@/utilities/I18Translate";
import { fetchCurrentCommunity } from "@/store/services/community.service";
import { store } from "@/store";
import { setCurrentCommunity } from "@/store/feature/community.slice";
import { Scoreboard as ScoreboardType } from "@/types/scoreboard";
import { Community } from "@/types/community";
import { CommunityLayout } from "@/layouts/Community";

/**
 * Scoreboard list page
 * @date 4/14/2023 - 1:36:53 PM
 *
 * @returns {ReactElement}
 */
export default function ScoreboardList(props: {
  pageProps: {
    community: Community;
    scoreboards: ScoreboardType[];
  };
}): ReactElement {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { community, scoreboards } = props.pageProps;

  useEffect(() => {
    dispatch(setCurrentCommunity(community));
    dispatch(setScoreboardList(scoreboards));
  }, [community, dispatch, scoreboards]);

  return (
    <div>
      <Head>
        <title>{getMetadataTitle(t("communities.navigation.scoreboard"), community?.name as string)}</title>
        {getMetadataDescription(community?.description as string).map((attributes, i) => (
          <meta key={`scoreboard-meta-${i}`} {...attributes} />
        ))}
      </Head>
      <CommunityWrapper>
        <div>
          <ScoreboardFilter />
        </div>
        <Scoreboard />
      </CommunityWrapper>
    </div>
  );
}

ScoreboardList.getLayout = function (page: ReactElement) {
  return <CommunityLayout>{page}</CommunityLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ locale, params }) => {
  const slug = params?.slug as string;

  const [{ data: community }, { payload: scoreboards }] = await Promise.all([
    store.dispatch(fetchCurrentCommunity({ slug, locale })),
    store.dispatch(fetchAllScoreboards({ slug, locale: locale || "en" })),
  ]);

  return { props: { community, scoreboards, ...(await i18Translate(locale as string)) } };
};

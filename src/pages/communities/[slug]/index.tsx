import { Community } from "@/types/community";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ChallengeCard from "@/components/cards/challenge/Challenge";
import Scoreboard from "@/components/sections/communities/overview/scoreboard/index";
import CommunityWrapper from "@/components/sections/communities/overview/Wrapper";
import CommunityLayout from "@/layouts/Community";
import { ReactElement } from "react";
import { Challenge } from "@/types/course";
import { wrapper } from "@/store";
import { fetchCurrentCommunity } from "@/store/services/community.service";
import { fetchAllChallenges } from "@/store/services/communities/challenges";
import { NotFoundError } from "@/utilities/errors/NotFoundError";
import { fetchAllScoreboards } from "@/store/services/communities/scoreboard.service";
import { useTranslation } from "next-i18next";
import { fetchCommunities } from "@/services/community";
import { GetStaticPathsContext } from "next";

export default function Slug(props: {
  pageProps: {
    community: Community;
    challenges: Challenge[];
  };
}): ReactElement {
  const { community, challenges } = props.pageProps;
  const { t } = useTranslation();
  return (
    <CommunityWrapper>
      {challenges.map((challenge) => (
        <ChallengeCard key={challenge.id} data={challenge} community={community} />
      ))}
      <div className="md:hidden">
        <div className="active md:hidden mb-7 scroll-smooth pt-5">
          <div className="font-medium text-.5xl leading-snug">{t("communities.overview.scoreboard.title")}</div>
          <div className="text-sm font-light lg:w-full lg:pr-7 pt-2">{t("communities.overview.scoreboard.description")} </div>
        </div>
        <Scoreboard />
      </div>
    </CommunityWrapper>
  );
}

Slug.getLayout = function (page: ReactElement) {
  return <CommunityLayout>{page}</CommunityLayout>;
};

export const getStaticProps = wrapper.getStaticProps((store: any) => async ({ locale, params }) => {
  try {
    const slug = params?.slug as string;

    const [{ data: community }, { data: challenges }, { data: scoreboard }, translations] = await Promise.all([
      store.dispatch(fetchCurrentCommunity({ slug, locale })),
      store.dispatch(fetchAllChallenges({ slug, locale })),
      store.dispatch(fetchAllScoreboards({ slug, locale: locale || "en" })),
      serverSideTranslations(locale as string),
    ]);
    if (!community || !challenges) throw new NotFoundError();
    return {
      props: {
        community,
        challenges,
        scoreboard,
        ...translations,
      },
      // TODO: Need to discuss how long we want to set the revalidation timeout
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
});

export const getStaticPaths = async (context: GetStaticPathsContext) => {
  const locale = context.defaultLocale;
  const communities = await fetchCommunities({ locale: locale ?? "en" });
  const paths = communities.map((community) => ({
    params: {
      slug: community.slug,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

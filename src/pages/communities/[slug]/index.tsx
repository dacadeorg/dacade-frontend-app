import { Community } from "@/types/community";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ChallengeCard from "@/components/cards/challenge/Challenge";
import Scoreboard from "@/components/sections/communities/overview/scoreboard/index";
import CommunityWrapper from "@/components/sections/communities/overview/Wrapper";
import CommunityLayout from "@/layouts/Community";
import { ReactElement } from "react";
import { Challenge } from "@/types/course";
import { wrapper } from "@/store";
import { fetchCurrentCommunity, fetchLearningMaterials } from "@/store/services/community.service";
import { fetchAllChallenges } from "@/store/services/communities/challenges";
import { NotFoundError } from "@/utilities/errors/NotFoundError";
import { fetchAllScoreboards } from "@/store/services/communities/scoreboard.service";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import MetaData from "@/components/ui/MetaData";
import LearningMaterialsOverview from "@/components/sections/communities/overview/LearningMaterials";
import { fetchCommunities } from "@/services/community";
import { GetStaticPathsContext } from "next";
import CommunityNavItem from "@/components/sections/communities/overview/_partials/NavItem";

export default function Slug(props: {
  pageProps: {
    community: Community;
    challenges: Challenge[];
  };
}): ReactElement {
  const { community, challenges } = props.pageProps;
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <MetaData community={community.name} title={t("communities.navigation.courses")} description={community?.description} />
      </Head>
      <CommunityWrapper>
        <CommunityNavItem
          title={t("communities.overview.challenges.title")}
          description={t("communities.overview.challenges.description")}
          className="md:hidden my-8"
        />
        <div className="grid gap-6">
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} data={challenge} community={community} />
          ))}
        </div>
        <div className="md:hidden w-full grid">
          <LearningMaterialsOverview />
          <Scoreboard />
        </div>
      </CommunityWrapper>
    </>
  );
}

Slug.getLayout = function (page: ReactElement) {
  return <CommunityLayout>{page}</CommunityLayout>;
};

export const getStaticProps = wrapper.getStaticProps((store: any) => async ({ locale, params }) => {
  try {
    const slug = params?.slug as string;

    const [{ data: community }, { data: challenges }, { data: scoreboard }, { data: learningMaterials }, translations] = await Promise.all([
      store.dispatch(fetchCurrentCommunity({ slug, locale })),
      store.dispatch(fetchAllChallenges({ slug, locale })),
      store.dispatch(fetchAllScoreboards({ slug, locale: locale || "en" })),
      store.dispatch(fetchLearningMaterials({ slug, locale })),
      serverSideTranslations(locale as string),
    ]);

    if (!community || !challenges) throw new NotFoundError();

    return {
      props: {
        community,
        challenges,
        scoreboard,
        learningMaterials: learningMaterials || { courses: [], learningModule: [] },
        ...translations,
      },

      revalidate: 60 * 60 * 24,
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

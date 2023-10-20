import { useMemo, useEffect, ReactElement } from "react";
import Wrapper from "@/components/sections/courses/Wrapper";
import Head from "next/head";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { Community } from "@/types/community";
import { Challenge, LearningModule } from "@/types/course";
import { findLearningModule, setCurrentLearningModule } from "@/store/feature/learningModules.slice";
import { setCurrentCommunity } from "@/store/feature/community.slice";
import { getMetadataDescription, getMetadataTitle } from "@/utilities/Metadata";
import DefaultLayout from "@/components/layout/Default";
import Header from "@/components/sections/learning-modules/Header";
import { initChallengeNavigationMenu } from "@/store/feature/communities/navigation.slice";
import { setColors } from "@/store/feature/ui.slice";
import useNavigation from "@/hooks/useNavigation";
import { GetServerSideProps } from "next";
import { store } from "@/store";
import { fetchCurrentCommunity } from "@/store/services/community.service";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ChallengeOverviewCard from "@/components/cards/challenge/Overview";
import LearningModuleSection from "@/components/sections/learning-modules";
import { fetchChallenge } from "@/store/services/communities/challenges";

/**
 * Learning module page props interfae
 * @date 4/24/2023 - 8:36:15 PM
 *
 * @interface LearningModulePageProps
 * @typedef {LearningModulePageProps}
 */
interface LearningModulePageProps {
  pageProps: {
    community: Community;
    challenge: Challenge;
    learningModule: LearningModule;
  };
}

/**
 * Learning module module view page
 * @date 4/24/2023 - 8:35:52 PM
 *
 * @export
 * @param {LearningModulePageProps} props
 * @returns
 */
export default function LearningModulePage(props: LearningModulePageProps) {
  const { community, learningModule, challenge } = props.pageProps;
  const dispatch = useDispatch();

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(setCurrentCommunity(community));
    dispatch(setCurrentLearningModule(learningModule));
    dispatch(setColors(community.colors));
    dispatch(initChallengeNavigationMenu(navigation.community));
  }, [community, learningModule, navigation.community]);

  const title = getMetadataTitle(learningModule?.title);
  const descriptions = getMetadataDescription(learningModule?.description);

  const paths = useMemo(() => [challenge.name, learningModule?.title], [challenge.name, learningModule?.title]);
  return (
    <>
      <Head>
        <title>{title}</title>
        {descriptions.map((meta, i) => (
          <meta key={`learning-module-head-${i}`} {...meta} />
        ))}
      </Head>
      <Wrapper paths={paths}>
        <div className="py-8 flex flex-col space-y-8 text-gray-700">
          <Header />
          <div className="w-full">
            {challenge.rewards && <ChallengeOverviewCard challenge={challenge} community={community} />}
            <LearningModuleSection learningModule={learningModule} />
          </div>
        </div>
      </Wrapper>
    </>
  );
}

LearningModulePage.getLayout = function (page: ReactElement) {
  return <DefaultLayout footerBackgroundColor={false}>{page}</DefaultLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
  try {
    const communitySlug = params?.slug as string;
    const challenge_id = params?.challenge_id as string;
    const learningModule_id = params?.id as string;

    const [{ data: community }, { data: challenge }, { payload: learningModule }, translations] = await Promise.all([
      store.dispatch(fetchCurrentCommunity({ slug: communitySlug, locale })),
      store.dispatch(fetchChallenge({ id: challenge_id })),
      store.dispatch(findLearningModule(learningModule_id)),
      serverSideTranslations(locale as string),
    ]);

    if (Object.entries(community).length === 0 || Object.entries(challenge).length === 0 || Object.entries(learningModule).length === 0) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        community,
        learningModule,
        challenge,
        ...translations,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

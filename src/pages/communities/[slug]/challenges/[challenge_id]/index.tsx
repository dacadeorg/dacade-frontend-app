import { useEffect, useMemo } from "react";
import Wrapper from "@/components/sections/courses/Wrapper";
import Header from "@/components/sections/challenges/Header";
import { OverviewRewards as Rewards } from "@/components/sections/challenges/Rewards";
import SubmissionForm from "@/components/sections/challenges/Submission";
import SubmissionCard from "@/components/cards/SubmissionView";
import { getMetadataTitle } from "@/utilities/Metadata";
import { wrapper } from "@/store";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "next-i18next";
import { authCheck } from "@/store/feature/auth.slice";
import { Challenge } from "@/types/course";
import { Submission } from "@/types/bounty";
import { ReactElement } from "react-markdown/lib/react-markdown";
import BestSubmissions from "@/components/sections/submissions/BestSubmissions";
import DefaultLayout from "@/components/layout/Default";
import { setColors } from "@/store/feature/ui.slice";
import { Colors, Community } from "@/types/community";
import Head from "next/head";
import MetaData from "@/components/ui/MetaData";
import { fetchChallenge, setCurrentChallenge } from "@/store/feature/communities/challenges";
import { setCurrentCommunity } from "@/store/feature/community.slice";
import { fetchCurrentCommunity } from "@/store/services/community.service";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import RatingRubric from "@/components/sections/challenges/Rubric";
import Learning from "@/components/sections/challenges/Learning";
import TeamChallenge from "@/components/sections/challenges/TeamChallenge";
import SetupTeamChallenge from "@/components/sections/challenges/SetupTeamChallenge";
import useNavigation from "@/hooks/useNavigation";
import { initChallengeNavigationMenu } from "@/store/feature/communities/navigation.slice";
import ChallengeObjectives from "@/components/sections/challenges/ChallengeObjectives";

/**
 * Challenge view page
 * @date 4/25/2023 - 8:12:39 PM
 *
 * @export
 * @param {{
  pageProps: {
    submission: Submission;
    challenge: Challenge;
    community: Community;
  };
}} props
 * @returns {ReactElement}
 */
export default function ChallengePage(props: {
  pageProps: {
    submission: Submission;
    challenge: Challenge;
    community: Community;
  };
}): ReactElement {
  const { challenge, community } = props.pageProps;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { submission, isAuthenticated } = useSelector((state) => ({
    course: state.courses.current,
    submission: state.submissions.current,
    isAuthenticated: authCheck(state),
  }));

  const title = useMemo(() => getMetadataTitle(t("communities.challenge.title"), challenge?.name || ""), [challenge?.name, t]);

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(setColors(community?.colors as Colors));
    dispatch(setCurrentCommunity(community as Community));
    dispatch(setCurrentChallenge(challenge));
    initChallengeNavigationMenu(navigation.community)(dispatch);
  }, [challenge, community, dispatch]);

  const headerPaths = useMemo(() => [t("communities.navigation.challenge")], [t]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <MetaData description={challenge?.description} />
      </Head>
      <Wrapper paths={headerPaths}>
        <div className="flex flex-col py-4 space-y-8 text-gray-700 divide-y divide-gray-200 divide-solid">
          <Header />
          <Rewards />
          <ChallengeObjectives />
          <TeamChallenge />
          <Learning courses={challenge.courses} learningModules={challenge.learningModules} community={community} />
          <RatingRubric ratingCriteria={challenge?.ratingCriteria} selected={[]} />
          <BestSubmissions />

          {isAuthenticated && (
            <div>
              {submission ? (
                <div className="mt-8">
                  <h4 className="my-8 text-.5xl font-medium">{t("communities.challenge.your-submission")}</h4>
                  <SubmissionCard submission={submission} />
                </div>
              ) : (
                <>{challenge.isTeamChallenge ? <SetupTeamChallenge /> : <SubmissionForm />}</>
              )}
            </div>
          )}
        </div>
      </Wrapper>
    </>
  );
}

ChallengePage.getLayout = function (page: ReactElement) {
  return <DefaultLayout footerBackgroundColor={false}>{page}</DefaultLayout>;
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (data) => {
  const { query, locale } = data;
  const { slug, challenge_id } = query;

  const fetchPayload = {
    slug: slug as string,
    locale: locale as string,
  };

  const [{ data: community }, { payload: challenge }] = await Promise.all([
    store.dispatch(fetchCurrentCommunity(fetchPayload)),
    store.dispatch(fetchChallenge({ ...fetchPayload, id: challenge_id as string, relations: ['rubric', 'courses', 'learning-modules'] })),
  ]);

  if (community && challenge) {
    return {
      props: {
        ...(await serverSideTranslations(data.locale as string)),
        community,
        challenge,
      },
    };
  }
  return {
    notFound: true,
  };
});

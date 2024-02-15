import { useCallback, useEffect, useMemo, useState } from "react";
import Wrapper from "@/components/sections/courses/Wrapper";
import Header from "@/components/sections/challenges/Header";
import { OverviewRewards as Rewards } from "@/components/sections/challenges/Rewards";
import SubmissionForm from "@/components/sections/challenges/Submission";
import SubmissionCard from "@/components/cards/SubmissionView";
import { getMetadataTitle } from "@/utilities/Metadata";
import { IRootState, wrapper } from "@/store";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "next-i18next";
import { authCheck } from "@/store/feature/auth.slice";
import { Challenge } from "@/types/course";
import { Submission } from "@/types/bounty";
import { ReactElement } from "react-markdown/lib/react-markdown";
import BestSubmissions from "@/components/sections/submissions/BestSubmissions";
import DefaultLayout from "@/components/layout/Default";
import { Community } from "@/types/community";
import Head from "next/head";
import MetaData from "@/components/ui/MetaData";
import { fetchCurrentCommunity } from "@/store/services/community.service";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import RatingRubric from "@/components/sections/challenges/Rubric";
import Learning from "@/components/sections/challenges/Learning";
import TeamChallenge from "@/components/sections/challenges/TeamChallenge";
import SetupTeamChallenge from "@/components/sections/challenges/SetupTeamChallenge";
import useNavigation from "@/hooks/useNavigation";
import { initChallengeNavigationMenu } from "@/store/feature/communities/navigation.slice";
import Objectives from "@/components/sections/challenges/Objectives";
import { getTeamByChallenge, getUserInvitesByChallenge } from "@/store/services/teams.service";
import { fetchChallenge, fetchChallengeAuthenticated } from "@/store/services/communities/challenges";
import Loader from "@/components/ui/Loader";
import { useRouter } from "next/router";
import Section from "@/components/ui/Section";
import Hint from "@/components/ui/Hint";
import Link from "next/link";

/**
 * interface for ChallengePage multiSelector
 * @date 9/13/2023 - 9:26:15 AM
 *
 * @interface ChallengePageMultiSelector
 * @typedef {ChallengePageMultiSelector}
 */
interface ChallengePageMultiSelector {
  submission: Submission | null;
  isAuthenticated: boolean;
  isSubmissionLoading: boolean;
}

/**
 * Challenge view page
 * @date 4/25/2023 - 8:12:39 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function ChallengePage() {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [community, setCommunity] = useState<Community | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { submission, isAuthenticated, isSubmissionLoading } = useMultiSelector<unknown, ChallengePageMultiSelector>({
    submission: (state: IRootState) => state.challenges.submission,
    isAuthenticated: (state: IRootState) => authCheck(state),
    isSubmissionLoading: (state: IRootState) => state.challenges.loading,
  });
  const title = useMemo(() => getMetadataTitle(t("communities.challenge.title"), challenge?.name || ""), [challenge?.name, t]);

  const canSubmit = useMemo(() => {
    return !submission || (submission && challenge?.multipleSubmissions);
  }, [challenge?.multipleSubmissions, submission]);

  const navigation = useNavigation();
  const { query, locale } = useRouter();
  const { challenge_id, slug } = query;

  const initPage = useCallback(async () => {
    const fetchPayload = {
      slug: slug as string,
      locale: locale as string,
    };

    setLoading(true);
    const [{ data: community }, { data: challenge }] = await Promise.all([
      dispatch(fetchCurrentCommunity(fetchPayload)) as any,
      dispatch(fetchChallenge({ ...fetchPayload, id: challenge_id as string, relations: ["rubric", "courses", "learning-modules", "best-submissions"] })) as any,
    ]);
    setCommunity(community);
    setChallenge(challenge);
    dispatch(initChallengeNavigationMenu(navigation.community));
    setLoading(false);
  }, [challenge_id, slug, locale]);

  useEffect(() => {
    initPage();
  }, [initPage]);

  useEffect(() => {
    if (challenge && isAuthenticated) {
      dispatch(fetchChallengeAuthenticated({ id: challenge.id }));
      if (challenge.isTeamChallenge) {
        dispatch(getTeamByChallenge(challenge.id));
        dispatch(getUserInvitesByChallenge(challenge.id));
      }
    }
  }, [challenge, dispatch, isAuthenticated]);

  const headerPaths = useMemo(() => [t("communities.navigation.challenge")], [t]);

  if (loading)
    return (
      <Section className="h-[50vh] flex items-center justify-center">
        <Loader />
      </Section>
    );

  if (challenge && community)
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
            <Objectives />
            {challenge.isTeamChallenge && <TeamChallenge />}
            <Learning courses={challenge.courses} learningModules={challenge.learningModules} community={community} />
            <RatingRubric ratingCriteria={challenge?.ratingCriteria} selected={[]} />
            <BestSubmissions />

            {isAuthenticated ? (
              <div>
                {isSubmissionLoading ? (
                  <div className="h-24 sm:h-48 grid place-items-center">
                    <Loader />
                  </div>
                ) : (
                  <div className="grid mt-8 space-y-8">
                    <Hint>
                      <p
                        className="text-lg py-4"
                        dangerouslySetInnerHTML={{
                          __html: t(
                            challenge?.multipleSubmissions ? "communities.challenge.submission.multiple-submissions" : "communities.challenge.submission.no-multiple-submissions"
                          ),
                        }}
                      ></p>
                    </Hint>
                    {submission && (
                      <>
                        <h4 className="text-.5xl font-medium">{t("communities.challenge.your-submission")}</h4>
                        <SubmissionCard submission={submission} />
                      </>
                    )}

                    {canSubmit && (
                      <>
                        {challenge.isTeamChallenge && <SetupTeamChallenge />}
                        <SubmissionForm />
                      </>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Hint className="mt-6 flex flex-col md:flex-row">
                  <p>To be able to submit</p>&nbsp;
                  <Link className="underline" href="/login">
                    Login.
                  </Link>
                </Hint>
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

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(() => async (data) => {
  const { locale } = data;
  return {
    props: {
      ...(await serverSideTranslations(locale as string)),
    },
  };
});

import DefaultLayout from "@/components/layout/Default";
import SubmissionPopup from "@/components/popups/submission";
import Header from "@/components/sections/communities/_partials/Header";
import Wrapper from "@/components/sections/courses/Wrapper";
import SubmissionList from "@/components/sections/submissions/List";
import MetaData from "@/components/ui/MetaData";
import useNavigation from "@/hooks/useNavigation";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { wrapper } from "@/store";
import { setCurrentChallenge } from "@/store/feature/communities/challenges";
import { fetchAllSubmission, setSubmissionsList, showSubmission } from "@/store/feature/communities/challenges/submissions";
import { initChallengeNavigationMenu } from "@/store/feature/communities/navigation.slice";
import { setCurrentCommunity } from "@/store/feature/community.slice";
import { setColors, toggleBodyScrolling } from "@/store/feature/ui.slice";
import { fetchChallenge } from "@/store/services/communities/challenges";
import { fetchCurrentCommunity } from "@/store/services/community.service";
import { Submission as SubmissionType } from "@/types/bounty";
import { Community } from "@/types/community";
import { Challenge } from "@/types/course";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useCallback, useEffect, useMemo, useState } from "react";

/**
 * Submission page
 * @date 6/6/2023 - 11:43:31 PM
 *
 * @export
 * @param {{ pageProps: { currentCommunity: Community; submissions: SubmissionType[] } }} props
 * @returns
 */
export default function Submission(props: { pageProps: { currentCommunity: Community; submissions: SubmissionType[]; challenge: Challenge } }) {
  const { currentCommunity, submissions, challenge } = props.pageProps;
  const [selectedSubmission, setSelectedSubmission] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { submission_id } = router.query;
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleCloseSubmission = useCallback(() => {
    setSelectedSubmission("");
    dispatch(showSubmission(""));
    router.replace(router.asPath.split("?")[0], undefined, { shallow: true });
  }, [dispatch, router]);

  useEffect(() => {
    dispatch(setCurrentCommunity(currentCommunity));
    dispatch(setSubmissionsList(submissions));
    dispatch(setColors(currentCommunity.colors));
    dispatch(setCurrentChallenge(challenge));
    initChallengeNavigationMenu(navigation.community)(dispatch);
    // Eslint desabled here for avoiding infinite rendering
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCommunity, dispatch, submissions]);

  useEffect(() => {
    setSelectedSubmission(submission_id as string);
    dispatch(showSubmission(submission_id as string));
    toggleBodyScrolling(!!submission_id)(dispatch);
  }, [dispatch, router.query, submission_id]);

  const headerPaths = useMemo(() => [t("communities.navigation.challenge")], [t]);

  if (!submissions) return <></>;

  return (
    <>
      <Head>
        <title>{`${t("communities.submission.title")} ${challenge?.name}`}</title>
        <MetaData description={challenge?.description as string} />
      </Head>
      <Wrapper paths={headerPaths}>
        <div className="flex flex-col py-4 space-y-8 text-gray-700">
          <Header title={challenge?.name} subtitle={t("communities.submission.title")} />
          <SubmissionList />
        </div>
        <SubmissionPopup show={!!selectedSubmission} submissionId={selectedSubmission} onClose={handleCloseSubmission} />
      </Wrapper>
    </>
  );
}

Submission.getLayout = function (page: ReactElement) {
  return <DefaultLayout footerBackgroundColor={false}>{page}</DefaultLayout>;
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ locale, query }) => {
  const { slug, challenge_id } = query;
  const { dispatch } = store;

  const [{ data: currentCommunity }, { payload: submissions }, { data: challenge }] = await Promise.all([
    dispatch(fetchCurrentCommunity({ slug: slug as string, locale: locale as string })),
    dispatch(fetchAllSubmission({ challengeId: challenge_id as string, locale: locale as string })),
    dispatch(fetchChallenge({ id: challenge_id as string, relations: ["rubric", "courses", "learning-modules"] })),
  ]);

  return {
    props: {
      currentCommunity,
      submissions,
      challenge,
      ...(await serverSideTranslations(locale as string)),
    },
  };
});

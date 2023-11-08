import DefaultLayout from "@/components/layout/Default";
import SubmissionPopup from "@/components/popups/submission";
import Header from "@/components/sections/communities/_partials/Header";
import Wrapper from "@/components/sections/courses/Wrapper";
import SubmissionList from "@/components/sections/submissions/List";
import MetaData from "@/components/ui/MetaData";
import useNavigation from "@/hooks/useNavigation";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useSelector } from "@/hooks/useTypedSelector";
import { wrapper } from "@/store";
import { showSubmission } from "@/store/feature/communities/challenges/submissions";
import { initChallengeNavigationMenu } from "@/store/feature/communities/navigation.slice";
import { toggleBodyScrolling } from "@/store/feature/ui.slice";
import { fetchAllSubmission, fetchChallenge } from "@/store/services/communities/challenges";
import { fetchCurrentCommunity } from "@/store/services/community.service";
import { Submission as SubmissionType } from "@/types/bounty";
import { Community } from "@/types/community";
import { Challenge } from "@/types/course";
import { NotFoundError } from "@/utilities/customErrors/NotFoundError";
import { localePath } from "@/utilities/Routing";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useCallback, useEffect, useMemo } from "react";

/**
 * Submission page
 * @date 6/6/2023 - 11:43:31 PM
 *
 * @export
 * @param {{ pageProps: { currentCommunity: Community; submissions: SubmissionType[] } }} props
 * @returns
 */
export default function Submission(props: { pageProps: { currentCommunity: Community; submissions: SubmissionType[]; challenge: Challenge } }) {
  const { submissions, challenge } = props.pageProps;
  const selectedSubmission = useSelector((state) => state.submissions.current);

  const dispatch = useDispatch();
  const router = useRouter();
  const { submission_id } = router.query;
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleCloseSubmission = useCallback(() => {
    if(!selectedSubmission) return;
    dispatch(showSubmission(""));
    window.history.pushState("", "", localePath(router, router.asPath));
    dispatch(toggleBodyScrolling(false));
  }, [dispatch, router, selectedSubmission]);

  useEffect(() => {
    dispatch(initChallengeNavigationMenu(navigation.community));
  }, [navigation.community, dispatch]);

  const handleShowSubmission = useCallback(
    (e: any) => {
      const newUrl = e.detail;
      const submissionId = newUrl.replace(localePath(router, router.asPath), "").replace(/\//g, "");
      const submission = submissions.find((submission) => submission.id === submissionId);
      if(!submission) return;
      dispatch(showSubmission(submissionId));
      dispatch(toggleBodyScrolling(true));
    },
    [dispatch, router, submissions]
  );

  useEffect(() => {
    window.addEventListener("onSoftNavigation", handleShowSubmission);
    window.addEventListener("popstate", handleCloseSubmission);
    return () => {
      window.removeEventListener("onSoftNavigation", handleShowSubmission);
      window.removeEventListener("popstate", handleCloseSubmission);
    };
  }, [handleCloseSubmission, handleShowSubmission]);

  // Temporary fix for links copied which have submission_id as a query parameter
  useEffect(() => {
    if (submission_id) router.push(`${router.asPath.split("?")[0]}/${submission_id}`);
  }, [router, submission_id]);

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
          <Header title={challenge?.name} subtitle={t("communities.submission.title")} isTeamChallenge={challenge?.isTeamChallenge} />
          <SubmissionList />
        </div>
        <SubmissionPopup show={!!selectedSubmission} onClose={handleCloseSubmission} submissionId={selectedSubmission?.id} />
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

  try {
    const [{ data: currentCommunity }, { data: submissions }, { data: challenge }, translations] = await Promise.all([
      dispatch(fetchCurrentCommunity({ slug: slug as string, locale: locale as string })),
      dispatch(fetchAllSubmission({ challengeId: challenge_id as string, locale: locale as string })),
      dispatch(fetchChallenge({ id: challenge_id as string, relations: ["rubric", "courses", "learning-modules"] })),
      serverSideTranslations(locale as string),
    ]);

    if (!currentCommunity || !challenge || !submissions) throw new NotFoundError();
    return {
      props: {
        currentCommunity,
        submissions,
        challenge,
        ...translations,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
});

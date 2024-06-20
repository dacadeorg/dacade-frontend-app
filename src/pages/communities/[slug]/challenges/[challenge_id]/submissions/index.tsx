import DefaultLayout from "@/components/layout/Default";
import useSubmissionNavigation from "@/hooks/useSubmissionNavigation";
import { wrapper } from "@/store";
import { fetchAllSubmission, fetchChallenge } from "@/store/services/communities/challenges";
import { fetchCurrentCommunity } from "@/store/services/community.service";
import { Submission as SubmissionType } from "@/types/bounty";
import { Community } from "@/types/community";
import { Challenge } from "@/types/course";
import { NotFoundError } from "@/utilities/errors/NotFoundError";
// import { he } from "date-fns/locale";÷
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ReactElement, useMemo } from "react";

/**
 * Submission page
 * @date 6/6/2023 - 11:43:31 PM
 *
 * @export
 * @param {{ pageProps: { currentCommunity: Community; submissions: SubmissionType[] } }} props
 * @returns
 */
export default function Submission(props: { pageProps: { currentCommunity: Community; submissions: SubmissionType[]; challenge: Challenge } }) {
  const { challenge } = props.pageProps;
  // const { selectedSubmission, submissions } = useMultiSelector<unknown, { selectedSubmission: SubmissionType; submissions: SubmissionType[] }>({
  //   selectedSubmission: (state: IRootState) => state.submissions.current,
  //   submissions: (state: IRootState) => state.submissions.list,
  // });

  const { submissions, selectedSubmission, handleCloseSubmission, showPopup} = useSubmissionNavigation();

  const { t } = useTranslation();

  const headerPaths = useMemo(() => [t("communities.navigation.challenge")], [t]);

  if (!submissions) return <></>;

  console.log(submissions, challenge, selectedSubmission, handleCloseSubmission, showPopup, headerPaths);

  return (
    <>
      {/* <Head>
        <title>{`${t("communities.submission.title")} ${challenge?.name}`}</title>
        <MetaData description={challenge?.description as string} />
      </Head> */}
      {/* <Wrapper paths={headerPaths}> */}
        <div className="flex flex-col py-4 space-y-8 text-gray-700">
          {/* <Header title={challenge?.name} subtitle={t("communities.submission.title")} isTeamChallenge={challenge?.isTeamChallenge} isHackathon={challenge?.isHackathon} /> */}
          {/* <SubmissionList /> */}
        </div>
        {showPopup && "Hello"}
      {/* </Wrapper> */}
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
      dispatch(fetchChallenge({ id: challenge_id as string, relations: ["rubric", "courses", "learning-modules"], locale })),
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

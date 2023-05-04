import { useEffect } from "react";
import Wrapper from "@/components/sections/courses/Wrapper";
import Header from "@/components/sections/challenges/Header";
import RatingRubric from "@/components/sections/challenges/Rubric";
import { OverviewRewards as Rewards } from "@/components/sections/challenges/Rewards";
import SubmissionForm from "@/components/sections/challenges/Submission";
import SubmissionCard from "@/components/cards/SubmissionView";
import { getMetadataTitle } from "@/utilities/Metadata";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { wrapper } from "@/store";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useSelector } from "@/hooks/useTypedSelector";
import { useRouter } from "next/router";
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
import {
  fetchChallenge,
  setCurrentChallenge,
} from "@/store/feature/communities/challenges";
import {
  fetchCurrentCommunity,
  setCurrentCommunity,
} from "@/store/feature/community.slice";

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
  const route = useRouter();
  const { t } = useTranslation();
  const course = useSelector((state) => state.courses.current);
  const title = getMetadataTitle(
    t("communities.challenge.title"),
    course?.name as string
  );

  useEffect(() => {
    dispatch(setColors(community?.colors as Colors));
    dispatch(setCurrentCommunity(community as Community));
    dispatch(setColors(community?.colors as Colors));
    dispatch(setCurrentChallenge(challenge));
  }, [dispatch, route, community, challenge]);
  const submission = useSelector(
    (state) => state.challenges.submission
  );
  const isAuthenticated = useSelector((state) => authCheck(state));

  return (
    <>
      <Head>
        <title>{title}</title>
        <MetaData description={challenge?.description} />
      </Head>
      <Wrapper>
        <div className="flex flex-col py-4 space-y-8 text-gray-700 divide-y divide-gray-200 divide-solid">
          <Header />
          <Rewards />
          <RatingRubric ratingCriteria={challenge?.ratingCriteria} />
          <BestSubmissions />
          {isAuthenticated && (
            <div>
              {submission ? (
                <div className="mt-8">
                  <h4 className="my-8 text-.5xl font-medium">
                    {t("communities.challenge.your-submission")}
                  </h4>
                  <SubmissionCard submission={submission} />
                </div>
              ) : (
                <SubmissionForm />
              )}
            </div>
          )}
        </div>
      </Wrapper>
    </>
  );
}

ChallengePage.getLayout = function (page: ReactElement) {
  return (
    <DefaultLayout footerBackgroundColor="default">
      {page}
    </DefaultLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (data) => {
    const { query, locale } = data;
    const { slug, course_slug, challenge_id } = query;

    const fetchPayload = {
      slug: slug as string,
      locale: locale as string,
    };

    const getCurrentCommunty = store.dispatch(
      fetchCurrentCommunity(fetchPayload)
    );

    const getCurrentChallenge = store.dispatch(
      fetchChallenge({ ...fetchPayload, id: challenge_id as string })
    );
    const results = await Promise.all([
      getCurrentCommunty,
      getCurrentChallenge,
    ]);

    const community = results[0].payload;
    const challenge = results[1].payload;

    if (community) {
      return {
        props: {
          ...(await serverSideTranslations(data.locale as string)),
          community,
          challenge,
        },
      };
    } else {
      return {
        notFound: true,
      };
    }
  }
);
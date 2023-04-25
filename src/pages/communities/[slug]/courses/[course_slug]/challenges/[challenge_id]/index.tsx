import { useEffect } from "react";
import Wrapper from "@/components/sections/courses/Wrapper";
// import Header from "@/components/sections/challenges/Header";
import RatingRubric from "@/components/sections/challenges/Rubric";
// import { OverviewRewards as Rewards } from "@/components/sections/challenges/Rewards";
// import SubmissionForm from "@/components/sections/challenges/Submission";
// import { Submission as BestSubmissions } from "@/components/sections/submissions/BestSubmissions";
import SubmissionCard from "@/components/cards/SubmissionView";
import {
  getMetadataDescription,
  getMetadataTitle,
} from "@/utilities/Metadata";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { wrapper } from "@/store";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useSelector } from "@/hooks/useTypedSelector";
import { fetchCurrentCommunity } from "@/store/feature/community.slice";
import { useRouter } from "next/router";
import { fetchCourse } from "@/store/feature/course.slice";
import {
  fetchAllChallenges,
  fetchChallenge,
} from "@/store/feature/communities/challenges";
import { useTranslation } from "next-i18next";
import { fetchAllScoreboards } from "@/store/feature/communities/scoreboard.slice";
import { authCheck } from "@/store/feature/auth.slice";
import { assign } from "lodash";
import { Challenge } from "@/types/course";
import { fetchAllSubmission } from "@/store/feature/communities/challenges/submissions";
import { Submission } from "@/types/bounty";
import CommunityLayout from "@/layouts/Community";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { RatingCriteria } from "@/types/challenge";

export default function ChallengePage(props: {
  pageProps: {
    submission: Submission;
    challenge: Challenge;
  };
}):ReactElement {
  const { challenge } = props.pageProps;
  const dispatch = useDispatch();
  const route = useRouter();
  const { t } = useTranslation();

  const community = useSelector((state) => state.communities.current);
  const course = useSelector((state) => state.courses.current);
  // const challenge = useSelector((state) => state.challenges.current);
  const submission = useSelector(
    (state) => state.challenges.submissions
  );
  const isAuthenticated = useSelector((state) => authCheck(state));

  return (
    <Wrapper>
      <div className="py-4 flex flex-col divide-y divide-solid divide-gray-200 space-y-8 text-gray-700">
        {/* <Header /> */}
        {/* <Rewards size="medium" /> */}
        <RatingRubric ratingCriteria={challenge.ratingCriteria} />
        {/* <BestSubmissions /> */}
        {isAuthenticated && (
          <div>
            {submission ? (
              <div className="mt-8">
                <h4 className="my-8 text-.5xl font-medium">
                  {t("communities.challenge.your-submission")}
                </h4>
                <SubmissionCard
                  submission={submission}
                  // link={`${submission.id}`}
                />
              </div>
            ) : (
              // <SubmissionForm />
              <></>
            )}
          </div>
        )}
      </div>
    </Wrapper>
  );
}

ChallengePage.getLayout = function (page: ReactElement) {
  return <CommunityLayout>{page}</CommunityLayout>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (data) => {
    const { query, locale } = data;

    const { slug, course_slug, challenge_id } = query;

    const fetchPayload = {
      slug: slug as string,
      locale: locale as string,
    };

    const results = await Promise.all([
      store.dispatch(fetchCurrentCommunity(fetchPayload)),
      store.dispatch(fetchAllScoreboards(fetchPayload)),
      store.dispatch(fetchChallenge({ id: challenge_id as string })),
      store.dispatch(
        fetchAllSubmission({ challengeId: challenge_id as string })
      ),
    ]);
    const community = results[0].payload;
    const scoreboards = results[1].payload;
    const challenge = results[2].payload;
    const submission = results[3].payload;
    console.log(challenge);

    return {
      props: {
        ...(await serverSideTranslations(locale as string)),
        community,
        // courses,
        // scoreboards,
        submission,
        challenge,
      },
    };
  }
);

import { useEffect, useMemo } from "react";
import Header from "@/components/sections/communities/_partials/Header";
import SubmissionView from "@/components/sections/submissions/View";
import Wrapper from "@/components/sections/courses/Wrapper";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useTranslation } from "next-i18next";
import { findSubmssionById } from "@/store/feature/communities/challenges/submissions";
import { ReactElement } from "react-markdown/lib/react-markdown";
import DefaultLayout from "@/components/layout/Default";
import { GetServerSideProps } from "next";
import { fetchCurrentCommunity } from "@/store/services/community.service";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { wrapper } from "@/store";
import { Challenge } from "@/types/course";
import { initChallengeNavigationMenu } from "@/store/feature/communities/navigation.slice";
import useNavigation from "@/hooks/useNavigation";
import { fetchChallenge } from "@/store/services/communities/challenges";

export default function SubmissionPage(props: { pageProps: { challenge: Challenge } }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { challenge } = props.pageProps;
  const navigation = useNavigation();

  useEffect(() => {
    initChallengeNavigationMenu(navigation.community)(dispatch);
  }, [dispatch, navigation.community]);

  const headerPaths = useMemo(() => [t("communities.navigation.challenge")], [t]);

  return (
    <Wrapper paths={headerPaths}>
      <div className="flex flex-col py-4 space-y-8">
        <Header title={challenge.name} subtitle={t("communities.submission.title")} />
        <SubmissionView />
      </div>
    </Wrapper>
  );
}
SubmissionPage.getLayout = function (page: ReactElement) {
  return <DefaultLayout footerBackgroundColor={false}>{page}</DefaultLayout>;
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ query, locale }) => {
  const { dispatch } = store;
  const { slug, submission_id, challenge_id } = query;
  const fetchPayload = {
    slug: slug as string,
    locale: locale as string,
  };

  try {
    const [{ data: community }, { payload: submission }, { data: challenge }] = await Promise.all([
      dispatch(fetchCurrentCommunity(fetchPayload)),
      dispatch(findSubmssionById({ id: submission_id as string })),
      dispatch(fetchChallenge({ id: challenge_id as string, relations: ["rubric", "courses", "learning-modules"] })),
    ]);

    return {
      props: {
        community,
        submission,
        challenge,
        ...(await serverSideTranslations(locale as string)),
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
});

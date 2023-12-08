import { useCallback, useEffect, useMemo, useState } from "react";
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
import { useRouter } from "next/router";
import Loader from "@/components/ui/Loader";
import Section from "@/components/ui/Section";

export default function SubmissionPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const router = useRouter();
  const { slug, locale, submission_id, challenge_id } = router.query;
  const [loading, setLoading] = useState(true);
  const [challenge, setChallenge] = useState<Challenge | null>(null);

  const initPage = useCallback(async () => {
    const fetchCurrentCommunityPayload = {
      slug: slug as string,
      locale: locale as string,
    };
    setLoading(true);
    const [, , { data }] = await Promise.all([
      dispatch(fetchCurrentCommunity(fetchCurrentCommunityPayload)),
      dispatch(findSubmssionById({ id: submission_id as string })),
      dispatch(fetchChallenge({ id: challenge_id as string, relations: ["rubric", "courses", "learning-modules"] })) as unknown as any,
    ]);
    setChallenge(data);
    dispatch(initChallengeNavigationMenu(navigation.community));
    setLoading(false);
  }, [challenge_id, slug, submission_id]);

  useEffect(() => {
    initPage();
  }, [initPage]);

  const headerPaths = useMemo(() => [t("communities.navigation.challenge")], [t]);

  if (loading)
    return (
      <Section className="h-[50vh] flex items-center justify-center">
        <Loader />
      </Section>
    );
  return (
    <Wrapper paths={headerPaths}>
      <div className="flex flex-col py-4 space-y-8">
        <Header title={challenge?.name} subtitle={t("communities.submission.title")} />
        <SubmissionView />
      </div>
    </Wrapper>
  );
}
SubmissionPage.getLayout = function (page: ReactElement) {
  return <DefaultLayout footerBackgroundColor={false}>{page}</DefaultLayout>;
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(() => async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string)),
    },
  };
});

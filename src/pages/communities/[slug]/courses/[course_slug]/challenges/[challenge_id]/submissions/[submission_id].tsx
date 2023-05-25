import { useEffect } from "react";
import Header from "@/components/sections/communities/_partials/Header";
import SubmissionView from "@/components/sections/submissions/View";
import Wrapper from "@/components/sections/courses/Wrapper";
import { getMetadataTitle } from "@/utilities/Metadata";
import { useSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { fetchCurrentCommunity } from "@/store/feature/community.slice";
import { fetchCourse } from "@/store/services/course.service";
import { findSubmssionById } from "@/store/feature/communities/challenges/submissions";
import { ReactElement } from "react-markdown/lib/react-markdown";
import DefaultLayout from "@/components/layout/Default";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function SubmissionPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation();
  const { course, submission } = useSelector((state) => ({
    course: state.courses.current,
    submission: state.submissions.current,
  }));

  const { slug, course_slug, submission_id } = router.query;

  useEffect(() => {
    dispatch(fetchCurrentCommunity({ slug: slug as string }));
    dispatch(
      fetchCourse({
        slug: course_slug as string,
        locale: router.locale,
      })
    );
    dispatch(findSubmssionById({ id: submission_id as string }));
  }, [dispatch, slug, course_slug, submission_id, router.locale]);

  const title = getMetadataTitle(t("communities.submission.title"), course?.name as string);

  return (
    <Wrapper>
      <div className="flex flex-col py-4 space-y-8 text-gray-700">
        <Header title={course?.name} subtitle={t("communities.submission.title")} />
        <SubmissionView />
      </div>
    </Wrapper>
  );
}
SubmissionPage.getLayout = function (page: ReactElement) {
  return <DefaultLayout footerBackgroundColor="default">{page}</DefaultLayout>;
};

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale as string)),
  },
});

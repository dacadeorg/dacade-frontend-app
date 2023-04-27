import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import Header from '@/components/sections/communities/_partials/Header';
import SubmissionView from '@/components/sections/submissions/View';
import Wrapper from '@/components/sections/courses/Wrapper';
import { getMetadataTitle } from '@/utilities/Metadata';
import { useSelector } from '@/hooks/useTypedSelector';
import { useDispatch } from '@/hooks/useTypedDispatch';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { fetchCurrentCommunity } from '@/store/feature/community.slice';
import { fetchCourse } from '@/store/feature/course.slice';
import { findSubmssionById } from '@/store/feature/communities/challenges/submissions';

export default function SubmissionPage() {
  const dispatch = useDispatch();
  const router = useRouter()
  const { t } = useTranslation()
  const course = useSelector((state) => state.courses.current);
  const submission = useSelector((state) => state.submissions.current);
  const { slug, course_slug, submission_id } = router.query;

  useEffect(() => {
    dispatch(fetchCurrentCommunity({ slug: slug as string }));
    dispatch(fetchCourse({ slug: course_slug as string , locale: router.locale }));
    dispatch(findSubmssionById({id:submission_id as string}));
  }, [dispatch, slug, course_slug, submission_id, router.locale]);

  const title = getMetadataTitle(t("communities.submission.title"), course?.name as string);

  return (
    <Wrapper>
      <div className="py-4 flex flex-col space-y-8 text-gray-700">
        <Header title={course?.name} subtitle={t("communities.submission.title")} />
        <SubmissionView />
      </div>
    </Wrapper>
  );
}


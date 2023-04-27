import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Header from "@/components/sections/communities/_partials/Header";
import List from "@/components/sections/submissions/List";
import Wrapper from "@/components/sections/courses/Wrapper";
import SubmissionPopup from "@/components/popups/submission";
import { getMetadataTitle } from "@/utilities/Metadata";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "next-i18next";
import { fetchCurrentCommunity } from "@/store/feature/community.slice";
import { fetchCourse } from "@/store/feature/course.slice";
import {
  fetchAllSubmission,
  showSubmission,
} from "@/store/feature/communities/challenges/submissions";

export default function Submission() {
  const [selectedSubmission, setSelectedSubmission] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { submission_id, slug, course_slug, challenge_id } =
    router.query;
  const course = useSelector((state) => state.courses.current);
  const submissions = useSelector(
    (state) => state.submissions.current
  );

  const { t } = useTranslation("communities");
  const metadata = {
    title: getMetadataTitle(
      t("submission.title"),
      course?.name as string
    ),
    // description: getMetadataDescription(challenge.description),
  };
  const handleDisplaySubmission = useCallback(
    () => {
      setSelectedSubmission(submission_id as string);
      dispatch(showSubmission(selectedSubmission));
      // window.history.pushState({}, null, route.path)
    },
    [dispatch, selectedSubmission, submission_id]
  );

  const handleCloseSubmission = () => {
    setSelectedSubmission("");
    // window.history.pushState({}, null, router.pathname)
  };

  useEffect(() => {
    if (submission_id) {
      handleDisplaySubmission();
    }
  }, [handleDisplaySubmission, router, submission_id]);

  useEffect(() => {
    if (slug && course_slug && challenge_id) {
      dispatch(
        fetchCurrentCommunity({
          slug: slug as string,
          locale: router.locale as string,
        })
      );
      dispatch(
        fetchCourse({
          slug: course_slug as string,
          locale: router.locale as string,
        })
      );
      dispatch(
        fetchAllSubmission({
          challengeId: challenge_id as string,
          locale: router.locale as string,
        })
      ).catch((e: any) => {
        console.error(e);
      });
    }
  }, [slug, course_slug, challenge_id, dispatch, router.locale]);

  return (
    <Wrapper>
      <div className="py-4 flex flex-col space-y-8 text-gray-700">
        <Header
          title={course?.name}
          subtitle={t("submission.title")}
        />
        <List />
      </div>
      <SubmissionPopup
        show={!!selectedSubmission}
        submissionId={selectedSubmission}
        onClose={handleCloseSubmission}
      />
    </Wrapper>
  );
}

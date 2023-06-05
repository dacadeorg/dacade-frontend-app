import { ReactElement, useCallback, useEffect, useState } from "react";
import FeedbackCard from "@/components/cards/Feedback";
import Loader from "@/components/ui/button/Loader";
import { useSelector } from "@/hooks/useTypedSelector";
import { authCheck } from "@/store/feature/auth.slice";
import Section from "../communities/_partials/Section";
import Criteria from "./Criteria";
import Form from "./Form";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { fetchFeedbacks } from "@/store/feature/communities/challenges/submissions/feedback.slice";
import { useRouter } from "next/router";

/**
 * Feedback  Component
 * @date 4/25/2023 - 2:23:01 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function Feedback(): ReactElement {
  const dispatch = useDispatch();
  const route = useRouter();
  const [loading, setLoading] = useState(false);

  const { feedbacks, isAuthenticated, submission, challenge } = useSelector((state) => ({
    feedbacks: state.feedback.list,
    isAuthenticated: authCheck(state),
    submission: state.submissions.current,
    challenge: state.challenges.current,
  }));

  const fetchList = useCallback(() => {
    dispatch(fetchFeedbacks({ submissionId: submission?.id as string, locale: route.locale }));
  }, [dispatch, route.locale, submission?.id]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  console.log(challenge);

  return (
    <div className="relative">
      {!loading && feedbacks.map((feedback, index) => <FeedbackCard key={feedback.id} value={feedback} last={index === feedbacks.length - 1} />)}
      {loading && <Loader loading={loading} />}
      {isAuthenticated && challenge?.feedbackInfo && (
        <Section>
          <Criteria />
          <Form save={fetchList} />
        </Section>
      )}
    </div>
  );
}

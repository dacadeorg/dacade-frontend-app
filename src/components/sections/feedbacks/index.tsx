import { ReactElement, useCallback, useEffect, useState } from "react";
import FeedbackCard from "@/components/cards/Feedback";
import Loader from "@/components/ui/button/Loader";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import { authCheck } from "@/store/feature/auth.slice";
import Section from "../communities/_partials/Section";
import Criteria from "./Criteria";
import Form from "./Form";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { fetchFeedbacks } from "@/store/feature/communities/challenges/submissions/feedback.slice";
import { useRouter } from "next/router";
import { Submission } from "@/types/bounty";
import { Challenge } from "@/types/course";
import { Feedback as FeedbackType } from "@/types/feedback";
import { IRootState } from "@/store";

interface FeedbackProps {
  testId?: string;
}

/**
 * interface for Feedback multiSelector
 * @date 9/13/2023 - 9:12:52 AM
 *
 * @interface FeedbackMultiSelector
 * @typedef {FeedbackMultiSelector}
 */
interface FeedbackMultiSelector {
  feedbacks: FeedbackType[];
  isAuthenticated: boolean;
  submission: Submission | null;
  challenge: Challenge | null;
}

/**
 * Feedback  Component
 * @date 4/25/2023 - 2:23:01 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function Feedback({ testId = "feedbackId" }: FeedbackProps): ReactElement {
  const dispatch = useDispatch();
  const route = useRouter();

  const { feedbacks, isAuthenticated, submission, challenge } = useMultiSelector<unknown, FeedbackMultiSelector>({
    feedbacks: (state: IRootState) => state.feedback.list,
    isAuthenticated: (state: IRootState) => authCheck(state),
    submission: (state: IRootState) => state.submissions.current,
    challenge: (state: IRootState) => state.challenges.current,
  });

  const [isFetching, setIsFetching] = useState(false);

  const fetchList = useCallback(async () => {
    setIsFetching(true);
    await dispatch(fetchFeedbacks({ submissionId: submission?.id as string, locale: route.locale }));
    setIsFetching(false);
  }, [dispatch, route.locale, submission?.id]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <div className="relative" data-testid={testId}>
      {isFetching ? <Loader loading={isFetching} /> : feedbacks.map((feedback, index) => <FeedbackCard key={feedback.id} value={feedback} last={index === feedbacks.length - 1} />)}
      {isAuthenticated && challenge?.feedbackInfo && (
        <Section>
          <Criteria />
          <Form onSave={fetchList} />
        </Section>
      )}
    </div>
  );
}

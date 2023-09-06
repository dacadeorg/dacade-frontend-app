import Badge from "@/components/ui/Badge";
import UserCard from "@/components/cards/User";
import ArrowButton from "@/components/ui/button/Arrow";
import { useSelector } from "@/hooks/useTypedSelector";
import { Submission } from "@/types/bounty";
import { useTranslation } from "next-i18next";
import { ReactElement, ReactNode, useCallback } from "react";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { showSubmission } from "@/store/feature/communities/challenges/submissions";
import { useRouter } from "next/router";
import Markdown from "../ui/Markdown";

/**
 * Submission card interface props
 */
interface SubmissionCardProps {
  submission: Submission;
  preview?: boolean;
  stats?: boolean;
  link?: string;
  buttons?: boolean;
  last?: boolean;
  timestamp?: {
    text: string;
    date: string;
  };
  children?: ReactNode;
}

/**
 * Submission card component
 * @return {ReactElement}
 */
export default function SubmissionCard({ submission, link = "", children }: SubmissionCardProps): ReactElement {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const router = useRouter();
  const { colors } = useSelector((state) => ({ colors: state.ui.colors }));

  const reviewed = submission?.metadata?.evaluation || submission?.metadata?.reviewed;

  const badgeButtonStyles = {
    backgroundColor: colors?.textAccent,
    color: colors?.text,
  };

  const arrowButtonStyles = {
    "--button-color--hover": colors?.text,
    "--button-background-color--hover": colors?.textAccent,
    "--button-border-color--hover": colors?.textAccent,
  };

  const displaySubmission = useCallback(() => {
    router.push({ query: { submission_id: submission?.id }, pathname: router.asPath }, undefined, { shallow: true });
  }, [router, submission?.id]);

  return (
    <UserCard
      user={submission.user}
      timestamp={{
        date: submission.created_at,
        text: t("submissions.submitted"),
      }}
      link={link}
      bordered={false}
      className="pt-6"
      boxLayout
    >
      <div className="divide-y divide-gray-200 flex flex-col">
        <div className="pb-6">
          <Markdown value={submission.text} markDownStyles="text-base sm:text-lg line-clamp-3 leading-normal text-gray-700 break-words" />
        </div>
        <div className="flex items-center py-4 w-full justify-between">
          <div className="flex space-x-4 items-center">
            {submission.reward && !reviewed ? (
              <div className="bg-yellow-50 text-yellow-900 text-sm border border-solid border-yellow-100 rounded px-3 py-0.5 inline-block">
                <span className="font-semibold">
                  {submission.reward.amount} {submission.reward.token}
                </span>
                <span> {t("submissions.feedback.bounty")}</span>
              </div>
            ) : (
              <></>
            )}
            {submission.metadata && submission.metadata.evaluation ? (
              <div className="inline-flex flex-1 items-center space-x-1">
                <Badge customStyle={badgeButtonStyles} size="medium" className="relative" value={submission.metadata.evaluation.points} />
                <span className="text-sm leading">{t("submissions.evaluation.points")}</span>
              </div>
            ) : (
              <></>
            )}
            {submission.metadata && submission.metadata.feedbacks ? (
              <div className="mr-2 text-sm relative leading-snug text-gray-700 inline-block">
                <span className="font-semibold">{submission.metadata.feedbacks}</span> {t("submissions.feedback.feedbacks")}
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className="text-right ml-auto xl:m-0 hidden sm:block">
            <ArrowButton
              padding={false}
              className="action-button inline-flex bg-gray-100 text-gray-500 w-10 h-10 sm:w-11 sm:h-11 text-2xl rounded-full"
              variant="none"
              minWidthClass="w-10 h-10"
              customStyle={arrowButtonStyles}
              arrowClasses=""
              onClick={() => {
                displaySubmission();
                dispatch(showSubmission(submission.id));
              }}
            />
          </div>
        </div>
        {children}
      </div>
    </UserCard>
  );
}

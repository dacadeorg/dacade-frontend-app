import UserCard from "@/components/cards/User";
import Badge from "@/components/ui/Badge";
import ArrowButton from "@/components/ui/button/Arrow";
import { useSelector } from "@/hooks/useTypedSelector";
import { Submission, User } from "@/types/bounty";
import { localePath } from "@/utilities/Routing";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { ReactElement, ReactNode, useCallback, useEffect, useState } from "react";

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
  const { t } = useTranslation();
  const router = useRouter();
  const colors = useSelector((state) => state.ui.colors);
  const [members, setMembers] = useState<User[]>([]);

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
    const url = localePath(router, `/${router.asPath}/${submission?.id}`);
    window.history.pushState("", "", url);
    window.dispatchEvent(new CustomEvent("onSoftNavigation", { detail: url }));
  }, [router, submission?.id]);

  useEffect(() => {
    if (submission.team) {
      const {
        team: { organizer, members },
      } = submission;
      setMembers(() => [(organizer as User) || submission.user]);
      members?.forEach(({ user }) => setMembers((prev) => [...prev, user]));
    }
  }, [submission]);

  return (
    <UserCard
      user={submission.user}
      submission={submission}
      timestamp={{
        date: submission.created_at,
        text: t("submissions.submitted"),
      }}
      teamMembers={members}
      link={link}
      bordered={false}
      className="pt-6 hover:bg-gray-50 cursor-pointer"
      boxLayout
      onClick={displaySubmission}
    >
      <div className="divide-y divide-gray-200 flex flex-col">
        <div className="pb-5">
          <p className="text-base sm:text-lg line-clamp-3 leading-normal text-gray-700 break-words">{submission.text}</p>
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
                <Badge customStyle={badgeButtonStyles} className="relative" value={submission.metadata.evaluation.points} />
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
              className="action-button inline-flex bg-gray-100 text-gray-500 w-10 h-10 text-2xl rounded-full"
              variant="none"
              minWidthClass="w-10 h-10"
              customStyle={arrowButtonStyles}
              arrowClasses=""
              onClick={displaySubmission}
            />
          </div>
        </div>
        {children}
      </div>
    </UserCard>
  );
}

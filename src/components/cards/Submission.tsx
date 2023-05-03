import Badge from "@/components/ui/Badge";
import UserCard from "@/components/cards/User";
import ArrowButton from "@/components/ui/button/Arrow";
import { useSelector } from "@/hooks/useTypedSelector";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { useTranslation } from "next-i18next";
import { User } from "@/types/bounty";
import { Reward } from "@/types/course";

interface Props {
  submission: {
    user: User;
    created_at: string;
    text: string;
    reward: Reward;
    metadata: {
      evaluation: {
        points: number;
      };
      feedbacks: number;
      reviewed: boolean;
    };
  };
  preview?: boolean;
  stats?: boolean;
  link?: string;
  buttons?: boolean;
  last?: boolean;
  timestamp?: {
    text: string;
    date: string;
  };
}

export default function SubmissionCard({
  submission,
  link = "",
}: Props): ReactElement {
  const { t } = useTranslation();
  const colors = useSelector((state) => state.ui.colors);

  const reviewed =
    submission?.metadata?.evaluation ||
    submission?.metadata?.reviewed;

  const badgeButtonStyles = {
    backgroundColor: colors.textAccent,
    color: colors.text,
  };

  const arrowButtonStyles = {
    "--button-color--hover": colors.text,
    "--button-background-color--hover": colors.textAccent,
    "--button-border-color--hover": colors.textAccent,
  };

  return (
    <UserCard
      user={submission.user}
      timestamp={{
        date: submission.created_at,
        text: t("submissions.submitted"),
      }}
      link={link}
      bordered={false}
      boxLayout
    >
      <div className="flex flex-col divide-y divide-gray-200">
        <div className="pb-6">
          <p className="text-base leading-normal text-gray-700 break-words sm:text-lg line-clamp-3">
            {submission.text}
          </p>
        </div>
        <div className="flex items-center justify-between w-full py-4">
          <div className="flex items-center space-x-4">
            {submission.reward && !reviewed && (
              <div className="bg-yellow-50 text-yellow-900 text-sm border border-solid border-yellow-100 rounded px-3 py-0.5 inline-block">
                <span className="font-semibold">
                  {submission.reward.amount} {submission.reward.token}
                </span>
                {t("submissions.feedback.bounty")}
              </div>
            )}
            {submission.metadata &&
              submission.metadata.evaluation && (
                <div className="inline-flex items-center flex-1 space-x-1">
                  <Badge
                    customStyle={badgeButtonStyles}
                    size="medium"
                    className="relative"
                    value={submission.metadata.evaluation.points}
                  />
                  <span className="text-sm leading">
                    {t("submissions.evaluation.points")}
                  </span>
                </div>
              )}
            {submission.metadata && submission.metadata.feedbacks && (
              <div className="relative inline-block mr-2 text-sm leading-snug text-gray-700">
                <span className="font-semibold">
                  {submission.metadata.feedbacks}{" "}
                </span>
                {t("submissions.feedback.feedbacks")}
              </div>
            )}
          </div>

          <div className="hidden ml-auto text-right xl:m-0 sm:block">
            <ArrowButton
              padding={false}
              className="inline-flex w-10 h-10 text-2xl text-gray-500 bg-gray-100 rounded-full action-button sm:w-11 sm:h-11"
              variant="none"
              arrowClasses="block "
              minWidthClass=""
              rounded
              customStyle={arrowButtonStyles}
            />
          </div>
        </div>
      </div>
    </UserCard>
  );
}

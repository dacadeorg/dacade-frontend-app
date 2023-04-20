import { useSelector } from "@/hooks/useTypedSelector";
import Currency from "@/components/ui/Currency";
import DateManager from "@/utilities/DateManager";
import Badge from "@/components/ui/Badge";
import Link from "next/link";
import { Submission } from "@/types/bounty";
import { ReactElement } from "react";
import navigation from "@/config/navigation";

interface SubmissionCardProps {
  submission: Submission;
}

export default function SubmissionCard({
  submission,
}: SubmissionCardProps): ReactElement {
  const colors = useSelector((state) => state.ui.colors);
  const community = useSelector((state) => state.communities.current);
  const date = DateManager.fromNow(submission.created_at, "en");

  return (
    <div className="bg-gray-50 text-sm text-gray-700 border-solid border border-gray-200 rounded-3xl mb-5 md:mb-0">
      <Link
        href={navigation.community.submissionsPath(submission.id)}
      >
        <div className="p-7">
          <span className="text-lg leading-loose font-medium text-gray-900 pb-1">
            {submission.user.displayName}
          </span>
          {submission.user.reputation && (
            <span className="text-xs px-2.5 bg-secondary leading-none py-1 rounded-full font-medium">
              <Currency
                value={submission.user.reputation}
                token="REP"
              />
            </span>
          )}
          <span className="block text-sm leading-snug text-gray-700 pb-4">
            Submissions submitted{" "}
            <span
              className="font-medium"
              style={{
                color: colors.textAccent,
              }}
            >
              {date}
            </span>
          </span>
          <p className="line-clamp-3">{submission.text}</p>
          <div className="pt-5">
            <Badge
              custom-style={{
                backgroundColor: colors.textAccent,
              }}
              size="medium"
              className="relative left-0"
              value={submission.metadata.evaluation.points}
            />
            <span className="ml-1 text-sm">
              Submissions evaluation points
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

import Badge from "@/components/ui/Badge";
import Currency from "@/components/ui/Currency";
import { useSelector } from "@/hooks/useTypedSelector";
import { Submission, User } from "@/types/bounty";
import CommunityNavigation from "@/utilities/CommunityNavigation";
import DateManager from "@/utilities/DateManager";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useMemo, useEffect, useState } from "react";

/**
 * SubmissionCardProps InterfaceProps
 * @date 4/25/2023 - 2:22:32 PM
 *
 * @interface SubmissionCard
 * @typedef {SubmissionCard}
 */
interface SubmissionCard {
  submission: Submission;
}

/**
 * SubmitionsCard Component
 * @date 4/25/2023 - 2:22:07 PM
 *
 * @export
 * @param {SubmissionCard} {
  submission,
}
 * @returns {ReactElement}
 */
export default function SubmissionCard({ submission }: SubmissionCard): ReactElement {
  const router = useRouter();
  const navigation = new CommunityNavigation(router);
  const [membersWithOrganiser, setMembersWithOrganiser] = useState<User[]>([]);
  const colors = useSelector((state) => state.ui.colors);
  const { t } = useTranslation();
  const createAt = useMemo(() => new Date(submission.created_at), [submission.created_at]);
  const date = useMemo(() => DateManager.fromNow(createAt, router.locale), [createAt, router.locale]);

  useEffect(() => {
    if (!submission?.team) return;

    const {
      team: { organizer, members: teamMembers },
    } = submission;

    if (!teamMembers) return;
    setMembersWithOrganiser(() => [(organizer as User) || submission.user, ...teamMembers.map(({ user }) => user)]);
  }, []);

  return (
    <div className="bg-gray-50 text-sm text-gray-700 border-solid border border-gray-200 rounded-3xl mb-5 md:mb-0">
      <Link href={navigation.submissionPath(submission.id)}>
        <div className="p-7">
          {membersWithOrganiser?.length ? (
            <div className="flex gap-2 overflow-hidden">
              {membersWithOrganiser?.map((user, index) => {
                return (
                  <div className="flex items-center space-x-1.5 pb-1.5 pt-1" key={`team-member-${index}`}>
                    <span className="text-lg leading-loose font-medium text-gray-900 pb-1 whitespace-nowrap">{user.displayName}</span>
                    {user.reputation ? (
                      <span className="text-xs px-2.5 bg-secondary leading-none py-1 rounded-full font-medium">
                        <Currency value={user.reputation} token="REP" />
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center space-x-1.5 pb-1.5 pt-1">
              <span className="text-lg leading-loose font-medium text-gray-900 pb-1">{submission.user.displayName}</span>
              {submission.user.reputation ? (
                <span className="text-xs px-2.5 bg-secondary leading-none py-1 rounded-full font-medium">
                  <Currency value={submission.user.reputation} token="REP" />
                </span>
              ) : (
                <></>
              )}
            </div>
          )}
          <span className="block text-sm leading-snug text-gray-700 pb-4">
            {t("submissions.submitted")}{" "}
            <span className="font-medium" style={{ color: colors?.textAccent }}>
              {date}
            </span>
          </span>
          <p className="line-clamp-3">{submission.text}</p>
          <div className="pt-5">
            <Badge customStyle={{ backgroundColor: colors?.textAccent }} size="medium" className="relative left-0" value={submission.metadata.evaluation.points} />
            <span className="ml-1 text-sm">{t("submissions.evaluation.points")}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

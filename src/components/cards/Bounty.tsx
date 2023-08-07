import { useTranslation } from "next-i18next";
import { ReactElement, useMemo } from "react";
import { useRouter } from "next/router";
import { Bounty } from "@/types/bounty";

import DateManager from "@/utilities/DateManager";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import Reward from "@/components/badges/RewardBadge";
import Link from "next/link";
import useNavigation from "@/hooks/useNavigation";

export enum RewardType {
  submission = "SUBMISSION",
}

/**
 * Bounty card component props
 * @date 3/29/2023 - 5:17:53 PM
 *
 * @interface BountyProps
 * @typedef {BountyProps}
 */

interface BountyProps {
  bounty: Bounty;
}

/**
 * Bounty card component
 * @date 3/29/2023 - 5:17:23 PM
 *
 * @param {BountyProps} { bounty }
 * @returns {ReactElement}
 */

export default function BountyCard({ bounty }: BountyProps): ReactElement {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const navigation = useNavigation();

  const convertDate = (date: Date) => DateManager.fromNow(date, locale);

  const type = () => {
    if (bounty.reward.type === RewardType.submission) return t("bounties.reward.challenge");
    return t("bounties.reward.feedback");
  };

  const isChallenge = useMemo(() => bounty.reward.type === RewardType.submission, [bounty.reward.type]);
  const link = useMemo(() => {
    if (bounty.url) return bounty.url;
    if (bounty.submissions?.link) return `/${bounty.submissions?.link}`;
    if (isChallenge) return navigation.community.challengePath(bounty.challenge, bounty?.slug);
    return navigation.community.submissionsPath(bounty.challenge, bounty?.slug);
  }, [bounty.challenge, bounty.course?.slug, bounty.slug, bounty.submissions?.link, bounty.url, isChallenge, navigation.community]);

  const Component = link.startsWith("http") ? "a" : Link;
  return (
    <div className="cursor-pointer flex md:flex-row-reverse md:space-x-5 px-5 min-h-32 md:h-auto md:w-full justify-between hover:bg-secondary relative">
      <div className="bg-theme-accent flex-col w-full h-full justify-between md:-space-y-1 pl-3 pr-5 mt-7 mb-5">
        <Component className="relative w-full block" href={link}>
          <div className="font-medium text-md md:pt-1.5">{bounty.course ? bounty.course.name : bounty.name}</div>
        </Component>
        <Component className="inline-flex md:flex h-2/3 md:flex-row flex-col-reverse justify-between" href={link}>
          <div className="text-sm pt-8 md:pt-2 md:pb-4 text-gray-600">{type()}</div>
          <div>
            <Reward type="gray" reward={bounty.reward}></Reward>
          </div>
        </Component>
        {bounty.submissions?.length ? (
          <div className="mt-4 space-y-0 divide-y divide-gray-200 border-t border-t-solid border-gray-200">
            {bounty.submissions.map((submission) => (
              <Link
                href={navigation.community.submissionPath(submission.id, bounty.challenge, bounty?.slug)}
                className="flex space-x-1 relative text-sm font-medium py-3"
                key={submission.id}
              >
                <div className="flex justify-between w-full pr-0">
                  <div className="flex space-x-1">
                    <Avatar user={submission.user} size="mini" />
                    <div>{submission.user.displayName}</div>
                    <div className="flex align-middle text-gray-500 text-middle bg-gray-200 px-2 text-xxs rounded-xl m-0 h-5">
                      {submission.metadata && submission.metadata.feedbacks ? submission.metadata.feedbacks : 0}
                    </div>
                  </div>
                  <div className="text-gray-500 text-base font-normal">
                    {submission.reviewable ? (
                      <span>
                        {t("bounties.prefix.closes")}
                        {convertDate(submission.reviewDeadline)}
                      </span>
                    ) : (
                      <span>{t("bounties.closes-soon")}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
      <Component className="self-start relative mt-15 md:mt-7" href={link}>
        <Avatar
          icon={bounty.icon}
          image={bounty.image}
          color={bounty.colors.primary}
          size="medium-fixed"
          shape="rounded"
          className="w-15 h-15 rounded-xl overflow-hidden"
          user={null}
          useLink={false}
        />
        {bounty.metadata?.submissions && (
          <Badge
            custom-style={{
              bottom: "-4px",
              right: "-4px",
              fontSize: 14,
              backgroundColor: bounty.colors.accent,
            }}
            size="medium"
            value={bounty.metadata?.submissions}
            className="bottom-0 -right-1 absolute p-4"
          />
        )}
      </Component>
    </div>
  );
}

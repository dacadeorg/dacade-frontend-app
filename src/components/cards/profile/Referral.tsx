import { ReactElement } from "react";
import Reward from "@/components/badges/RewardBadge";
import Avatar from "@/components/ui/Avatar";
import DateManager from "@/utilities/DateManager";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

enum LocaleDateFormat {
  es = "es",
  en = "en",
  hr = "hr",
  bg = "bg",
  fr = "fr",
}

/**
 * Interface for referral props
 * @date 3/30/2023 - 11:31:45 AM
 *
 * @interface ReferralInterface
 * @typedef {ReferralInterface}
 */

interface ReferralInterface {
  referral: {
    user: {
      created_at: Date;
      displayName: string;
    };
    submission: {
      created_at: Date;
      metadata: {
        evaluation: {
          points: number;
          totalPoints: number;
        };
      };
    };
    rewarded: boolean;
    updated_at: Date;
    challenge: string;
    community: {
      name: string;
    };
    metadata: {
      reward: number;
    };
  };
}

/**
 * Referral card that imports reward and avatar components
 * @date 3/30/2023 - 11:30:48 AM
 *
 * @export
 * @param {ReferralInterface} {
  referral,
}
 * @returns {ReactElement}
 */

export default function Referral({
  referral,
}: ReferralInterface): ReactElement {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const joinedAt = DateManager.fromNow(
    referral.user.created_at,
    locale as LocaleDateFormat
  );
  let participatedAt = null;
  if (referral.submission) {
    participatedAt = DateManager.fromNow(
      referral.submission.created_at,
      locale as LocaleDateFormat
    );
  }
  let rewardAt = null;
  if (referral.rewarded) {
    rewardAt = DateManager.fromNow(
      referral.updated_at,
      locale as LocaleDateFormat
    );
  }
  return (
    <div className="text-sm text-gray-700 bg-gray-50 md:mb-0">
      <div className="flex p-7">
        <div className="">
          <Avatar size="large" user={referral.user} />
        </div>
        <div className="ml-5">
          <span className="pb-1 text-lg font-medium leading-loose text-gray-900">
            {referral.user.displayName}
          </span>
          <p>
            {t("referrals.joined")} {joinedAt}
          </p>
          <div className="pt-1">
            <ul className="pb-1 text-sm font-light leading-loose text-gray-700 list">
              {referral.challenge && referral.community && (
                <li>
                  <span className="ml-5">
                    {t("referrals.challenge-participation")}
                  </span>
                  <span className="font-bold">
                    {referral.community.name}
                  </span>
                  <span className="hidden md:inline-block">
                    {participatedAt}
                  </span>
                </li>
              )}
              {referral.submission &&
                referral.submission.metadata &&
                referral.submission.metadata.evaluation && (
                  <li>
                    <span className="ml-5">
                      {t("referrals.submission.evaluation")}
                    </span>
                    <span className="font-bold">
                      {referral.submission.metadata.evaluation.points}
                      /
                      {
                        referral.submission.metadata.evaluation
                          .totalPoints
                      }
                    </span>
                    {t("referrals.submission.points")}
                    <span className="hidden md:inline-block">
                      {rewardAt}
                    </span>
                  </li>
                )}
              {referral.rewarded &&
                referral.metadata &&
                referral.metadata.reward && (
                  <li>
                    <span className="ml-5">
                      {t("referrals.reward.text")}
                    </span>
                    <span className="font-bold">
                      <Reward
                        type="gray"
                        reward={referral.metadata.reward}
                      />
                    </span>
                    <span className="hidden md:inline-block">
                      {rewardAt}
                    </span>
                  </li>
                )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

import { ReactElement, useMemo } from "react";
import Avatar from "@/components/ui/Avatar";
import RewardBadge from "@/components/badges/RewardBadge";
import DateManager from "@/utilities/DateManager";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Referral as ReferralType } from "@/types/community";

interface ReferralProps {
  referral: ReferralType;
}

/**
 * Referral component
 * @date 3/30/2023 - 11:19:33 AM
 *
 * @export
 * @param {ReferralProps} {
  referral,
}
 * @returns {ReactElement}
 */

export default function Referral({ referral }: ReferralProps): ReactElement {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const joinedAt = useMemo(() => DateManager.fromNow(referral.user.created_at, locale), [locale, referral.user.created_at]);
  const participatedAt = useMemo(() => (referral.submission ? DateManager.fromNow(referral.submission.created_at, locale) : null), [locale, referral.submission]);
  const rewardAt = useMemo(() => (referral.rewarded ? DateManager.fromNow(referral.updated_at, locale) : null), [locale, referral.rewarded, referral.updated_at]);

  return (
    <div className="bg-gray-50 text-sm text-gray-700 md:mb-0">
      <div className="flex p-7">
        <div className="">
          <Avatar size="large" user={referral.user} />
        </div>
        <div className="ml-5">
          <span className="text-lg leading-loose font-medium text-gray-900 pb-1">{referral.user.displayName}</span>
          <p>
            {t("referrals.joined")} {joinedAt}
          </p>
          <div className="pt-1">
            <ul className="text-sm leading-loose font-light text-gray-700 pb-1 list">
              {referral.challenge && referral.community && (
                <li>
                  <span className="ml-5">{t("referrals.challenge-participation")}</span>
                  <span className="font-bold">{referral.community.name}</span>
                  <span className="hidden md:inline-block">{participatedAt}</span>
                </li>
              )}

              {referral.submission && referral.submission.metadata && referral.submission.metadata.evaluation && (
                <li>
                  <span className="ml-5">{t("referrals.submission.evaluation")}</span>
                  <span className="font-bold">
                    {referral.submission.metadata.evaluation.points}/{referral.submission.metadata.evaluation.totalPoints}
                  </span>
                  {t("referrals.submission.points")}
                  <span className="hidden md:inline-block">{rewardAt}</span>
                </li>
              )}

              {referral.rewarded && referral.metadata && referral.metadata.reward && (
                <li>
                  <span className="ml-5">{t("referrals.reward.text")}</span>
                  <span className="font-bold">
                    <RewardBadge type="gray" reward={referral.metadata.reward} />
                  </span>
                  <span className="hidden md:inline-block">{rewardAt}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

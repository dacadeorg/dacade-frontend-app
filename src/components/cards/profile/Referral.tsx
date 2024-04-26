import { ReactElement, useMemo } from "react";
import Avatar from "@/components/ui/Avatar";
import DateManager from "@/utilities/DateManager";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Referral as ReferralType } from "@/types/community";
import Link from "next/link";
import TimeIcon from "@/icons/time.svg";
import RewardBadge from "@/components/badges/RewardBadge";
import { Evaluation } from "@/types/bounty";

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
  const joinedAt = useMemo(() => DateManager.fromNow(referral.created_at, locale), [locale, referral.created_at]);
  const rewardAt = useMemo(() => (referral.rewarded ? DateManager.fromNow(referral.updated_at, locale) : null), [locale, referral.rewarded, referral.updated_at]);
  const status = (evaluation: Evaluation) => {
    if (!evaluation) return t("referrals.challenge.evaluation.status.pending")
    return t(evaluation?.reward ? "referrals.challenge.evaluation.status.passed" : "referrals.challenge.evaluation.status.failed")
  }

  const formatDate = (date: Date) => {
    return date ? DateManager.fromNow(date, locale) : null
  }
  return (
    <div className="text-sm text-gray-700 bg-gray-50 md:mb-0 p-7">
      <div className="w-full">
        <div className="flex gap-4 ">
          <Avatar size="large" user={referral.user} hideVerificationBadge />
          <p className="grid">
            <span className="pb-1 text-lg font-medium leading-loose text-gray-900">{referral.user?.displayName}</span>
            <span className="text-gray-500">{t("referrals.joined")} {joinedAt}</span>
          </p>
        </div>
        <div className="flex-grow md:ml-19">
          <div className="pt-1">
            <ul className="pb-1 font-light leading-loose text-gray-700 grid divide-y-2 space-y-4 divide-gray-200">
              {referral.user.submissions.length ? referral.user.submissions.map((submission) => (
                <li key={submission.id} className="grid md:flex justify-between pt-4 gap-2 md:gap-0">
                  <span className="grid gap-2">
                    <span>
                      {status(submission.metadata.evaluation)} <Link href={submission.link} className="font-bold underline text-base- underline-offset-2">{submission.challengeData.name} {t("referrals.submission.challenge")}</Link>
                    </span>
                    {!submission?.metadata?.evaluation && <span className="mr-0 flex items-center gap-2.5 leading-none "> <TimeIcon />{t("referrals.challenge.evaluation.pending")}</span>}
                  </span>
                  <span className="text-gray-500">{formatDate(submission.updated_at)}</span>
                </li>
              )
              ) : <></>}

              {referral?.rewarded && referral.metadata && referral.metadata.reward && (
                <li className="pt-4 grid gap-2 md:gap-0 md:flex md:justify-between">
                  <span className="grid md:gap-2 md:flex items-center">
                    <span>{t("referrals.reward.text")}</span>
                    <span className="font-bold flex justify-start">
                      <RewardBadge type="gray" reward={referral.metadata.reward} />
                    </span>
                  </span>

                  <span className="text-gray-500">{rewardAt}</span>
                </li>
              )}
            </ul>
          </div>
        </div >
      </div >
    </div >
  );
}

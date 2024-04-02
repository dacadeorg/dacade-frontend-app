import { ReactElement, useMemo } from "react";
import Avatar from "@/components/ui/Avatar";
import RewardBadge from "@/components/badges/RewardBadge";
import DateManager from "@/utilities/DateManager";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Referral as ReferralType } from "@/types/community";
import Link from "next/link";

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

  const status = (evaluation: any) => {
    if (!evaluation) return t("referrals.challenge.evaluation.pending")
    return t(evaluation?.reward ? "referrals.challenge.evaluation.passed" : "referrals.challenge.evaluation.failed")
  }

  const formatDate = (date: any) => {
    return date ? DateManager.fromNow(date, 'en') : null
  }
  return (
    <div className="text-sm text-gray-700 bg-gray-50 md:mb-0 p-7">
      <div className="w-full">
        <div className="flex gap-4 ">
          <Avatar size="large" user={referral.user} hideVerificationBadge />
          <p className="grid">
            <span className="pb-1 text-lg font-medium leading-loose text-gray-900">{referral.user?.displayName}</span>
            <span>{t("referrals.joined")} {joinedAt}</span>
          </p>
        </div>
        <div className="flex-grow md:ml-19">
          <div className="pt-1">
            <ul className="pb-1 font-light leading-loose text-gray-700 grid divide-y-2 space-y-4 divide-gray-200">
              {referral?.submissions.length ? referral.submissions.map((_submission) => (
                <div key={_submission.id} className="grid md:flex justify-between mt-4">
                  <span className="">
                    <span>{status(_submission.metadata.evaluation)}</span> {" "}
                    <Link href={`${_submission.challenge.name}`} className="font-bold underline text-base underline-offset-2">{_submission.challenge.name} challenge</Link>
                  </span>
                  {!_submission.evaluation && <span className="mr-0">Pending evaluation</span>}
                  <span className="text-grey-500">{formatDate(_submission.updated_at)}</span>
                </div>
              )
              ) : <>no submissions</>}

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
        </div >
      </div >
    </div >
  );
}

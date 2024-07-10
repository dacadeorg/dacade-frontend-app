import { useTranslation } from "next-i18next";
import Coin from "@/components/ui/Coin";
import { shortenNumber } from "@/utilities";
import { Reward } from "@/types/course";
import classNames from "classnames";
import { ReactElement } from "react";

interface RewardCertificateProps {
  rewards: Reward[];
  isReward?: boolean;
}

/**
 * RewardCertificate component is a function component that renders a list of rewards
 * for a challenge.
 *
 * @param {RewardCertificateProps} { rewards, isReward }
 * @returns {JSX.Element} The rendered RewardCertificate component.
 */

export default function RewardCertificate({ rewards, isReward }: RewardCertificateProps): ReactElement {
  const { t } = useTranslation();
  return (
    <>
      {rewards.map((reward, index) => (
        <div
          key={reward.id}
          className={classNames(
            "flex items-center gap-1 border-gray-200 pb-1.5",
            { "pt-1.5": index !== 0 },
            { "border-b": (index !== rewards.length - 1 && isReward) || (rewards.length === 1 && isReward) || index !== rewards.length - 1 }
          )}
        >
          <Coin size="small" token={reward?.token} />
          <div className={`${isReward ? "text-base" : "text-sm"}`}>
            <span>
              {shortenNumber(reward.amount)} {reward.token}
            </span>
            <span>
              {reward.type === "SUBMISSION" ? (
                <span> {t("communities.overview.challenge.for.certificate")}</span>
              ) : (
                <span> {t("communities.overview.challenge.for.feedback")}</span>
              )}
            </span>
          </div>
        </div>
      ))}
    </>
  );
}

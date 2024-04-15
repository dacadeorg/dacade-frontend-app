import { useTranslation } from "react-i18next";
import Coin from "@/components/ui/Coin";
import { shortenNumber } from "@/utilities";
import { Reward } from "@/types/course";
import classNames from "classnames";
import { ReactElement } from "react";

interface RewardCertificatesProps {
  rewards: Reward[];
  isReward?: boolean;
}

/**
 * RewardCertificates component is a function component that renders a list of rewards
 * for a challenge.
 *
 * @param {RewardCertificatesProps} { rewards, isReward }
 * @returns {JSX.Element} The rendered RewardCertificates component.
 */

export default function RewardCertificates({ rewards, isReward }: RewardCertificatesProps): ReactElement {
  const { t } = useTranslation();
  return (
    <>
      {rewards.map((reward, index) => (
        <div
          key={reward.id}
          className={classNames(
            "flex items-center gap-1 border-gray-200 pb-2",
            { "pt-2": index !== 0 },
            { "border-b": (index !== rewards.length - 1 && isReward) || (rewards.length === 1 && isReward) || index !== rewards.length - 1 }
          )}
        >
          <Coin size="small" token={reward?.token} />
          <div className="text-sm">
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

import Coin from "@/components/ui/Coin";
import { Challenge, Reward } from "@/types/course";
import { useTranslation } from "next-i18next";
import DateManager from "@/utilities/DateManager";

/**
 * Renders a container with border, rounded corners, and spacing,
 * displaying information about a challenge.
 *
 * @component
 */
export default function Overview({ challenge }: { challenge: Challenge }) {
  const { t } = useTranslation();
  const expirationDate = challenge?.expiresAt && DateManager.format(challenge.expiresAt, "MMMM d, yyyy", "en");
  return (
    <div className="border mt-8 border-gray-200 rounded-3xl mb-5 group text-gray-700 p-6">
      <div className="text-gray-900 text-lg leading-normal">
        <span className="text-default font-medium">{t("communities.overview.challenge.title")}</span>
        <span className="ml-1.5">{challenge.name}</span>
      </div>
      <div className="md:flex md:flex-row flex-col rounded-full max-w-max text-sm mt-6 space-y-8 md:space-x-8 md:space-y-0">
        {challenge.rewards.map((reward, index) => (
          <div key={`reward=${index}`} className="flex items-center">
            <Coin size="medium" token={reward?.token} />
            <div className="text-sm md:pl-2 max-w-max">
              <div className="flex gap-1 text-gray-700 font-medium">
                <span>{reward.amount}</span>
                <span>{reward?.token}</span>
                <span>{t("communities.overview.challenge.rewards")}</span>
              </div>
              <div className="text-gray-400 text-xs font-normal">{t("communities.overview.challenge.subtitle")}</div>
            </div>
          </div>
        ))}
      </div>
      {expirationDate && (
        <div className="text-gray-400 text-sm font-normal pt-6">
          <span>{t("communities.overview.challenge.deadline")}: </span>
          <span className="font-medium">{expirationDate}</span>
        </div>
      )}
    </div>
  );
}

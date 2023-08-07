import Coin from "@/components/ui/Coin";
import { Challenge, Reward } from "@/types/course";
import { useTranslation } from "next-i18next";

/**
 * Renders a container with border, rounded corners, and spacing,
 * displaying information about a challenge.
 *
 * @component
 */
export default function Overview({ challenge }: { challenge: Challenge }) {
  const { t } = useTranslation();
  return (
    <div className="border mt-8 border-gray-200 rounded-3xl mb-5 group text-gray-700 p-6">
      <div className="text-gray-900 text-lg leading-normal">
        <span className="text-default font-medium">{t("communities.overview.challenge.title")}</span>
        <span className="ml-1.5">{challenge.name}</span>
      </div>
      <div className="md:flex md:flex-row flex-col rounded-full max-w-max text-sm mt-6 space-y-8 md:space-x-8 md:space-y-0">
        {challenge.rewards.map((reward, index) => (
          <div key={`reward=${index}`} className="flex items-center">
            <Coin size="medium" token={reward.token} />
            <div className="text-sm md:pl-2 max-w-max">
              <div className="flex text-gray-700 font-medium">
                <span className="pr-1">{reward.amount}</span>
                <span>
                  {t("communities.overview.challenge.rewards", {
                    count: parseInt(reward.token),
                  })}
                </span>
              </div>
              <div className="text-gray-400 text-xs font-normal">{t("communities.overview.challenge.subtitle")}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-gray-400 text-sm font-normal pt-6">
        <span>{t("communities.overview.challenge.deadline")}: </span>
        {/* TODO: will be implemented when we have a challenge with expiration date or deadline. */}
        <span className="font-medium">March 12th, 2022</span>
      </div>
    </div>
  );
}

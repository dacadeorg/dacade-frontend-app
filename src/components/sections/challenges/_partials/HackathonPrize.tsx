import { Distribution, Reward } from "@/types/course";
import { shortenNumber } from "@/utilities";
import { useTranslation } from "react-i18next";

export default function HackathonPrize({ reward, description, testId }: { reward: Reward; description: string, testId?: string }) {
  const { t } = useTranslation()
  const { first, second, third } = reward?.distribution || ({} as Distribution);
  const amount = shortenNumber(reward?.amount);
  return (
    <>
      <div data-testid={testId} className="flex gap-1 text-gray-700 font-medium">
        <span>
          {reward?.fiatCurrency ?
            t('communities.overview.reward.fiat.prize.pool', { amount, currency: reward.fiatCurrency, token: reward?.token }) :
            t('communities.overview.reward.crypto.prize.pool', { amount, token: reward?.token })}
        </span>
        <span>{description}</span>
      </div>
      <div className="text-gray-400 text-xs font-medium leading-3 mt-1 flex">
        <span>{`1st Place ${shortenNumber(first)}; 2nd Place ${shortenNumber(second)}; 3rd Place ${shortenNumber(third)}`}</span>
      </div>
    </>
  );
}

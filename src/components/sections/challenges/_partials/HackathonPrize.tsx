import { Distribution, Reward } from "@/types/course";
import { shortenNumber } from "@/utilities";

export default function HackathonPrize({ reward, description }: { reward: Reward; description: string }) {
  const { first, second, third } = reward?.distribution || ({} as Distribution);
  return (
    <>
      <div className="flex gap-1 text-gray-700 font-medium">
        <span>{`${shortenNumber(reward?.amount)} ${reward.token} Prize Pool`}</span>
        <span>{description}</span>
      </div>
      <div className="text-gray-400 text-xs font-medium leading-3 mt-1 flex">
        <span>{`1st Place ${shortenNumber(first)}; 2nd Place $${shortenNumber(second)}; 3rd Place $${shortenNumber(third)}`}</span>
      </div>
    </>
  );
}

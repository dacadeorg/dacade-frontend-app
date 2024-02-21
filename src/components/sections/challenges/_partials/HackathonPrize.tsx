import { Distribution } from "@/types/challenge";
import { Reward } from "@/types/course";
import { formatToK } from "@/utilities";

export default function HackathonPrize({ reward, description }: { reward: Reward; description: string }) {
  const { first, second, third } = reward?.distribution || ({} as Distribution);

  return first && second && third ? (
    <>
      <div className="flex gap-1 text-gray-700 font-medium">
        <span>{`${formatToK(reward?.amount)} Prize Pool`}</span>
        <span>{description}</span>
      </div>
      <div className="text-gray-400 text-xs font-medium leading-3 mt-1 flex">
        <span>{`1st Place ${formatToK(first)};  2nd Place ${formatToK(second)}; 3rd Place ${formatToK(third)}`}</span>
      </div>
    </>
  ) : (
    <></>
  );
}

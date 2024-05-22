import { Distribution, Reward } from "@/types/course";


export default function HackathonPrize({ reward, description, testId }: { reward: Reward; description: string, testId?: string }) {
  const { first, second, third } = reward?.distribution || ({} as Distribution);
  return (
    <>
      <div data-testid={testId} className="flex gap-1 text-gray-700 font-medium">
        <span>{`$${reward?.amount} Prize Pool`}</span>
        <span>{description}</span>
      </div>
      <div className="text-gray-400 text-xs font-medium leading-3 mt-1 flex">
        <span>{`1st Place $${first};  2nd Place $${second}; 3rd Place $${third}`}</span>
      </div>
    </>
  );
}

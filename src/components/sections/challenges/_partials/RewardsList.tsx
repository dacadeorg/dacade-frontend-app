import Reward from "@/components/cards/challenge/_partials/Reward";
import { Reward as TReward } from "@/types/course";

export default function RewardsList({ rewards, testId }: { rewards?: TReward[], testId?: string }) {
  return (
    <div data-testid={testId}>
      {rewards?.map((reward, i) => (
        <div key={`reward-list-${i}`}>
          <Reward reward={reward} size="medium" />
        </div>
      ))}
    </div>
  );
}

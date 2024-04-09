import Reward from "@/components/cards/challenge/_partials/Reward";
import { Reward as TReward } from "@/types/course";

export default function RewardsList({ rewards }: { rewards?: TReward[] }) {
  return (
    <div data-testid="rewardListId">
      {rewards?.map((reward, i) => (
        <div data-testid="rewardElementId" key={`reward-list-${i}`}>
          <Reward reward={reward} size="medium" />
        </div>
      ))}
    </div>
  );
}

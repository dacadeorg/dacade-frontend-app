import OverviewRewards from "@/components/ui/Reward";
import { reward } from "@__mocks__/fixtures/reward";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("OverviewRewards", () => {
  it("Should render reward", () => {
    render(<OverviewRewards reward={reward} />);
    const rewards = screen.getByTestId("reward");
    expect(rewards).toBeInTheDocument();
  });

  it("Should render reward details", () => {
    render(<OverviewRewards reward={reward} size="medium" />);
    const rewardAmount = screen.getByText(reward.amount.toString());
    const rewardToken = screen.getByText(reward.token.toString());
    expect(rewardAmount).toHaveTextContent(reward.amount.toString());
    expect(rewardToken).toHaveTextContent(reward.token);
  });
});

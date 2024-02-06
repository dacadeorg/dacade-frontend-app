import OverviewRewards from "@/components/ui/Reward";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { reward } from "../../../__mocks__/reward";

describe("OverviewRewards", () => {
  it("Should render reward", () => {
    render(<OverviewRewards reward={reward} />);
    const rewards = screen.getByTestId("reward");
    expect(rewards).toBeInTheDocument();
  });

  it("should render reward details with medium size", () => {
    render(<OverviewRewards reward={reward} size="medium" />);
    expect(screen.getByText(reward.amount.toString())).toBeInTheDocument();
    expect(screen.getByText(reward.token)).toBeInTheDocument();
  });

});

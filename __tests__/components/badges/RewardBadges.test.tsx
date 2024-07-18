import "@testing-library/jest-dom";
import RewardBadge from "@/components/badges/RewardBadge";
import { render, screen } from "@testing-library/react";
import Coin from "@/components/ui/Coin";

describe("RewardBadges", () => {
  it("should render  rewardBadges", () => {
    render(<RewardBadge />);
    const rewardBadge = screen.getByTestId("RewardBadge");
    expect(rewardBadge).toBeInTheDocument();
  });

  it("should render rewardBadges with coins", () => {
    render(<RewardBadge />);
    render(<Coin />);
    const rewardBadge = screen.queryByTestId("RewardBadge");
    const coin = screen.getByTestId("coin");
    expect(rewardBadge).toBeInTheDocument();
    expect(coin).toBeInTheDocument();
  });
  it("should render rewardBadges with amount and token", () => {
    render(<RewardBadge reward={{ token: "BTC", amount: 1000 }} displayAmount={true} />);
    const rewardBadge = screen.getByTestId("RewardBadge");
    const coin = screen.getByTestId("coin");
    const amount = screen.getByTestId("amount");
    expect(rewardBadge).toBeInTheDocument();
    expect(coin).toBeInTheDocument();
    expect(amount).toBeInTheDocument();
  });
});

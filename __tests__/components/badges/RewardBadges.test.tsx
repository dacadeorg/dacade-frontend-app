import "@testing-library/jest-dom";
import RewardBadge, { RewardBadgeProps } from "@/components/badges/RewardBadge";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "@__mocks__/renderWithRedux";

const mockRewardBadges: RewardBadgeProps = {
  type: "transparent",
  reward: {
    token: "BTC",
    amount: 2,
  },
  displayAmount: true,
};
jest.mock("../../../src/utilities", () => ({
  shortenNumber: (num: number) => `shortened-${num}`,
}));

describe("RewardBadges", () => {
  it("should render  rewardBadges", () => {
    renderWithRedux(<RewardBadge {...mockRewardBadges} />);
    const rewardBadge = screen.getByTestId("RewardBadge");
    expect(rewardBadge).toBeInTheDocument();
  });
  it("should render rewardBadges with coin when the token is provide", () => {
    renderWithRedux(<RewardBadge reward={{ token: "BTC" }} />);
    const rewardBadge = screen.getByTestId("RewardBadge");
    const coin = screen.getByTestId("coin");
    expect(rewardBadge).toBeInTheDocument();
    expect(coin).toBeInTheDocument();
  });

  it("should render rewardBadges with amount and token", () => {
    renderWithRedux(<RewardBadge reward={{ token: "BTC", amount: 1000 }} displayAmount={true} />);
    const text = screen.getByText("shortened-1000 BTC");
    expect(text).toBeInTheDocument();
  });

  it('should display "0" when the reward amount is 0 and token is empty', () => {
    renderWithRedux(<RewardBadge reward={{ token: "", amount: 0 }} />);
    const rewardBadge = screen.getByTestId("RewardBadge");
    expect(rewardBadge).toBeInTheDocument();
    expect(rewardBadge).toHaveTextContent("0");
  });
});

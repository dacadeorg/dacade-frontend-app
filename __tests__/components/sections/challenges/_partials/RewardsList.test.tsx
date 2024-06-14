import RewardsList from "@/components/sections/challenges/_partials/RewardsList";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { reward } from "../../../../../__mocks__/reward";

describe("RewardsList", () => {
  it("should render the reward list", () => {
    render(<RewardsList rewards={[reward]} testId="rewardListId" />);
    const rewardList = screen.getByTestId("rewardListId");
    expect(rewardList).toBeInTheDocument();
    [reward].forEach((reward) => {
      expect(screen.getByText(reward.token)).toBeInTheDocument();
      expect(screen.getByText(reward.token).textContent).toBe("token");
    });
  });
});
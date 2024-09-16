import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Rewards, { OverviewRewardsProps } from "@/components/cards/challenge/_partials/Reward";


const rewardProps: OverviewRewardsProps = {
  reward: {
    id: "1",
    ref: "ref-1",
    created_at: new Date(),
    updated_at: new Date(),
    challenge: "challenge-1",
    type: "submission",
    community: "community-1",
    token: "Token",
    stable: true,
    amount: 100,
    timestamp: Date.now(),
  },
  size: "medium",
};

describe("Rewards", () => {
  it("should render the Rewards component with medium size", () => {
    render(<Rewards {...rewardProps} />);
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("Token")).toBeInTheDocument();
    expect(screen.getByText("reward.type.prefix")).toBeInTheDocument();
    expect(screen.getByText("communities.challenge.submission")).toBeInTheDocument();
  });

  it("should not render the Rewards component if size is not medium", () => {
    const smallSizeProps = { ...rewardProps, size: "small" };
    render(<Rewards {...smallSizeProps} />);
    expect(screen.queryByText("100")).not.toBeInTheDocument();
    expect(screen.queryByText("Token")).not.toBeInTheDocument();
  });

  it("should not render the Rewards component if reward is not provided", () => {
    const noRewardProps = { ...rewardProps, size: "" };
    render(<Rewards {...noRewardProps} />);
    expect(screen.queryByText("100")).not.toBeInTheDocument();
    expect(screen.queryByText("Token")).not.toBeInTheDocument();
  });
});

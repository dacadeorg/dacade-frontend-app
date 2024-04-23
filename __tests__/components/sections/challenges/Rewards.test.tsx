import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ReduxProvider from "../../../../__mocks__/provider/ReduxProvider";
import { OverviewRewards } from "@/components/sections/challenges/Rewards";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
  }),
}));

describe("Reward", () => {
  it("should render a reward", () => {
    render(
      <ReduxProvider>
        <OverviewRewards />
      </ReduxProvider>
    );
    const OverviewReward = screen.getByTestId("overviewRewardId");
    expect(OverviewReward).toBeInTheDocument();
    const rewardTitle = screen.getByText("communities.overview.reward.title")
    expect(rewardTitle).toBeInTheDocument();
    const rewardSubtitle = screen.getByText("communities.overview.reward.subtitle")
    expect(rewardSubtitle).toBeInTheDocument();
    const challengeCertificate = screen.getByText("communities.overview.challenge.certificate")
    expect(challengeCertificate).toBeInTheDocument()
  });
});

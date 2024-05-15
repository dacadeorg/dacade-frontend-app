import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { OverviewRewards } from "@/components/sections/challenges/Rewards";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import { challenge } from "../../../../__mocks__/challenge";
import { submission } from "../../../../__mocks__/submission";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    query: "",
  }),
}));

describe("Reward", () => {
  it("should render a reward", () => {
    renderWithRedux(<OverviewRewards />, { challenges: { current: challenge, list: [challenge], loading: false, submission: submission } });
    const OverviewReward = screen.getByTestId("overviewRewardId");
    expect(OverviewReward).toBeInTheDocument();
    const rewardTitle = screen.getByText("communities.overview.reward.title");
    expect(rewardTitle).toBeInTheDocument();
    const rewardSubtitle = screen.getByText("communities.overview.reward.subtitle");
    expect(rewardSubtitle).toBeInTheDocument();
    const challengeCertificate = screen.getByText("communities.overview.challenge.participate");
    expect(challengeCertificate).toBeInTheDocument();
  });
});

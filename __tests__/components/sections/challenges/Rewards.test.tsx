import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { OverviewRewards } from "@/components/sections/challenges/Rewards";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import { challenge as mockChallenge, submission } from "../../../../__mocks__/challenge";

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: "",
  }),
}));

describe("Reward", () => {
  it("should render a reward", () => {
    const challenge = mockChallenge();
    renderWithRedux(<OverviewRewards />, { challenges: { current: challenge, list: [challenge], loading: false, submission: submission() } });
    const OverviewReward = screen.getByTestId("overviewRewardId");
    expect(OverviewReward).toBeInTheDocument();
    const rewardTitle = screen.getByText("communities.overview.reward.title");
    expect(rewardTitle).toBeInTheDocument();
    const rewardSubtitle = screen.getByText("communities.overview.reward.subtitle");
    expect(rewardSubtitle).toBeInTheDocument();
    if (challenge.isHackathon) {
      const challengeCertificate = screen.getByText("communities.overview.challenge.participate");
      expect(challengeCertificate).toBeInTheDocument();
    }
  });
});

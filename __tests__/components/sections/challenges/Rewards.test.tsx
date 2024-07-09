import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { OverviewRewards } from "@/components/sections/challenges/Rewards";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import { challenge, submission } from "@__mocks__/fixtures/challenge";

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: "query",
  }),
}));

describe("Reward", () => {
  it("should render a reward", () => {
    renderWithRedux(<OverviewRewards testId="overviewRewardId" />);
    expect(screen.getByTestId("overviewRewardId")).toBeInTheDocument();
  });

  it("should render reward with the challenge", () => {
    renderWithRedux(<OverviewRewards testId="overviewRewardId" />, { challenges: { current: challenge, list: [challenge], loading: false, submission: submission } });
    if (challenge.rewards) {
      challenge.rewards.forEach((reward) => {
        expect(screen.getByText(`${reward.amount} ${reward.token}`)).toBeInTheDocument();
      });
    }
    if (challenge.isHackathon) {
      const challengeCertificate = screen.getByText("communities.overview.challenge.participate");
      expect(challengeCertificate).toBeInTheDocument();
      expect(challengeCertificate.textContent).toContain(challenge.reward?.token || challenge?.rewards[0]?.token || "");
    }
  });
});

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
    renderWithRedux(<OverviewRewards testId="overviewRewardId" />, { challenges: { current: challenge, list: [challenge], loading: false, submission: submission() } });
    const OverviewReward = screen.getByTestId("overviewRewardId");
    expect(OverviewReward).toBeInTheDocument();
    expect(OverviewReward.textContent).toBe("course.challenge.reward.certificate.description")
    if(challenge.rewards){
        challenge.rewards.forEach((reward)=> {
            expect(screen.getByText(reward.amount + (" ") + reward.token)).toBeInTheDocument()
            expect(screen.getByText(reward.amount + (" ") + reward.token).textContent).toBe("10 token")
        })
    }
    if (challenge.isHackathon) {
      const challengeCertificate = screen.getByText("communities.overview.challenge.participate");
      expect(challengeCertificate).toBeInTheDocument();
      expect(challengeCertificate.textContent).toContain(challenge.reward.token || challenge?.rewards[0]?.token || "")
    }
  });
});
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import SetupTeamChallenge from "@/components/sections/challenges/SetupTeamChallenge";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import { challenge, mockInvite, submission } from "@__mocks__/fixtures/challenge";

describe("SetUpTeamChallenge", () => {
  const mockTeamChallengeStates = {
    challenges: { current: challenge, list: [challenge], loading: false, submission: submission },
    invites: { data: mockInvite },
  };
  it("renders without crashing", () => {
    renderWithRedux(<SetupTeamChallenge testid="challengeId" />);
    expect(screen.getByTestId("challengeId")).toBeInTheDocument();
  });

  it("renders content correctly", () => {
    renderWithRedux(<SetupTeamChallenge />, mockTeamChallengeStates);
    expect(screen.getByText("Submission")).toBeInTheDocument();
    expect(screen.getByText("communities.overview.challenge.team.setup.info")).toBeInTheDocument();
    expect(screen.getByText("Form your team")).toBeInTheDocument();
    expect(screen.getByText(challenge?.additionalInfo?.TEAM_FORMATION.text || " ") || "communities.overview.challenge.team.organization").toBeInTheDocument();
  });

  it("renders the confirmation of the team invitation when there is an invite", () => {
    renderWithRedux(<SetupTeamChallenge />, mockTeamChallengeStates);
    if (!mockInvite.team.locked && mockInvite) {
      expect(screen.getByText("Submit your team")).toBeInTheDocument();
      expect(screen.getByText(`The maximum team members for this challenge is ${challenge?.teamLimit} people`)).toBeInTheDocument();
    } else {
      expect(screen.getByText("communities.overview.challenge.team.setup.submit-title")).toBeInTheDocument();
      expect(screen.getByText("communities.overview.challenge.team.setup.description")).toBeInTheDocument();
    }
  });
});

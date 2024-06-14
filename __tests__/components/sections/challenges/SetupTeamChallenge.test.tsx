import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { challenge as mockChallenge, mockInvite, submission } from "../../../../__mocks__/challenge";
import SetupTeamChallenge from "@/components/sections/challenges/SetupTeamChallenge";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";

describe("SetUpTeamChallenge", () => {
  const challenge = mockChallenge();
  const mockSubmission = submission();
  const mockTeamChallengeStates = {
    challenges: { current: challenge, list: [challenge], loading: false, submission: mockSubmission },
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
    expect(screen.getByText(challenge.additionalInfo.TEAM_FORMATION.text) || "communities.overview.challenge.team.organization").toBeInTheDocument();
  });

  it("renders CreateTeamCard when there is no invitation or comfirmTeamInvitation when there is invitation", () => {
    renderWithRedux(<SetupTeamChallenge />, mockTeamChallengeStates);
    if (!mockInvite) {
      expect(screen.getByText("communities.overview.challenge.team.setup.submit-title")).toBeInTheDocument();
      expect(screen.getByText("communities.overview.challenge.team.setup.description")).toBeInTheDocument();
    } else {
      expect(screen.getByText("Submit your team")).toBeInTheDocument();
      expect(screen.getByText(`The maximum team members for this challenge is ${challenge?.teamLimit} people`)).toBeInTheDocument();
    }
  });
});

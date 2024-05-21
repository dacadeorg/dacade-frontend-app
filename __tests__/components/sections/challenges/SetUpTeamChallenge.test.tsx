import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import SetupTeamChallenge from "@/components/sections/challenges/SetupTeamChallenge";
import { challenge as mockChallenge, submission, mockInvite } from "../../../../__mocks__/challenge";

describe("SetupTeamChallenge", () => {
  const challenge = mockChallenge();
  it("renders without crashing", () => {
    renderWithRedux(<SetupTeamChallenge />);
  });

  it("renders content correctly", () => {
    renderWithRedux(<SetupTeamChallenge />, { challenges: { current: challenge, list: [challenge], loading: false, submission: submission() }, invites: { data: mockInvite } });
    expect(screen.getByText("Submission")).toBeInTheDocument();
    expect(screen.getByText("communities.overview.challenge.team.setup.info")).toBeInTheDocument();
    expect(screen.getByText("Form your team")).toBeInTheDocument();
    expect(screen.getByText(challenge.additionalInfo.TEAM_FORMATION.text) || "communities.overview.challenge.team.organization").toBeInTheDocument();
  });

  it("renders CreateTeamCard when there is no invitation or comfirmTeamInvitation when there is invitation", () => {
    renderWithRedux(<SetupTeamChallenge />, { challenges: { current: challenge, list: [challenge], loading: false, submission: submission() }, invites: { data: mockInvite } });
    const challenges = challenge;
    if (!mockInvite) {
      expect(screen.getByText("communities.overview.challenge.team.setup.submit-title" || "")).toBeInTheDocument();
      expect(screen.getByText("communities.overview.challenge.team.setup.description" || "")).toBeInTheDocument();
    } else {
      expect(screen.getByText("Submit your team")).toBeInTheDocument();
      expect(screen.getByText(`The maximum team members for this challenge is ${challenges?.teamLimit || "3"} people`)).toBeInTheDocument();
    }
  });
});

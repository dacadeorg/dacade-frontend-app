import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import SetupTeamChallenge from "@/components/sections/challenges/SetupTeamChallenge";
import { challenge, mockInvite } from "../../../../__mocks__/challenge";
import { submission } from "../../../../__mocks__/submission";

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

describe("SetupTeamChallenge", () => {
  it("renders without crashing", () => {
    renderWithRedux(<SetupTeamChallenge />);
  });

  it("renders content correctly", () => {
    renderWithRedux(<SetupTeamChallenge />, { challenges: { current: challenge, list: [challenge], loading: false, submission: submission }, invites: { data: mockInvite } });
    expect(screen.getByText("Submission")).toBeInTheDocument();
    expect(screen.getByText("communities.overview.challenge.team.setup.info")).toBeInTheDocument();
    expect(screen.getByText("Form your team")).toBeInTheDocument();
  });

  it("renders CreateTeamCard when there is no invitation or comfirmTeamInvitation when there is invitation", () => {
    renderWithRedux(<SetupTeamChallenge />, { challenges: { current: challenge, list: [challenge], loading: false, submission: submission }, invites: { data: mockInvite } });
    if (!mockInvite) {
      expect(screen.getByText("communities.overview.challenge.team.setup.submit-title" || "")).toBeInTheDocument();
      expect(screen.getByText("communities.overview.challenge.team.setup.description" || "")).toBeInTheDocument();
    } else {
      expect(screen.getByText("Submit your team")).toBeInTheDocument();
      expect(screen.getByText(`The maximum team members for this challenge is ${challenge?.teamLimit || "3"} people`)).toBeInTheDocument();
    }
  });
});

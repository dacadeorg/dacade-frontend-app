import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import SetupTeamChallenge from "@/components/sections/challenges/SetupTeamChallenge";
import { mockChallenge, mockInvite } from "../../../../__mocks__/challenge";
import { mockSubmission } from "../../../../__mocks__/bounty";

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
    renderWithRedux(<SetupTeamChallenge />);
    expect(screen.getByText("Submission")).toBeInTheDocument();
    expect(screen.getByText("communities.overview.challenge.team.setup.info")).toBeInTheDocument();
    expect(screen.getByText("Form your team")).toBeInTheDocument();
  });

  it("renders ConfirmTeamInvitation when there is invitation", () => {
    renderWithRedux(<SetupTeamChallenge />, {challenges: {current : mockChallenge, list: [mockChallenge], loading: false, submission: mockSubmission}, invites: {data: mockInvite}});
    if(mockInvite){ 
      expect(screen.getByText("Submit your team")).toBeInTheDocument();
      expect(screen.getByText(`The maximum team members for this challenge is ${mockChallenge?.teamLimit || "3"} people`)).toBeInTheDocument(); 
    }
  });

  it("renders CreateTeamCard when there is no invitation", () => {
    renderWithRedux(<SetupTeamChallenge />, {challenges: {current : mockChallenge, list: [mockChallenge], loading: false, submission: mockSubmission}, invites: {data: mockInvite}});
    if(!mockInvite){ 
      expect(screen.getByText("communities.overview.challenge.team.setup.submit-title" || "")).toBeInTheDocument();
      expect(screen.getByText("communities.overview.challenge.team.setup.description" || "")).toBeInTheDocument(); 
    }  
  });
});

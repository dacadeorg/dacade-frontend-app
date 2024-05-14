import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import SetupTeamChallenge from "@/components/sections/challenges/SetupTeamChallenge";

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
    expect(screen.getByText("Form your team")).toBeInTheDocument();
    expect(screen.getByText("Open discord channel #icp-ai-web3-hachathon and find your teammates to complete the challenge with you.")).toBeInTheDocument();
  });

  it("renders CreateTeamCard when there is no invitation or the team is locked", () => {
    renderWithRedux(<SetupTeamChallenge />);
    expect(screen.getByText("Form your team")).toBeInTheDocument();
    expect(screen.getByText("Open discord channel #icp-ai-web3-hachathon and find your teammates to complete the challenge with you.")).toBeInTheDocument();
  });
});

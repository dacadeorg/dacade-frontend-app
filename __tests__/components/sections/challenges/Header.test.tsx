import ChallengeHeader from "@/components/sections/challenges/Header";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import { challenge, submission } from "../../../../__mocks__/challenge";

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

describe("ChallengeHeader", () => {
  it("should render the ChallengeHeader", () => {
    renderWithRedux(<ChallengeHeader />);
    const challengeheader = screen.getByTestId("challengeHeaderId");
    expect(challengeheader).toBeInTheDocument();
  });

  it("should render the challenge header with section", () => {
    renderWithRedux(<ChallengeHeader />, { challenges: { current: challenge(), list: [challenge()], loading: false, submission: submission() } });
    const challenges = challenge();
    expect(screen.getByText("communities.challenge.title")).toBeInTheDocument();
    expect(screen.getByText(challenges.name)).toBeInTheDocument();
    expect(screen.getByText(challenges.description)).toBeInTheDocument();
  });
});

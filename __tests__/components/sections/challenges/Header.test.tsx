import ChallengeHeader from "@/components/sections/challenges/Header";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import { challenge } from "../../../../__mocks__/challenge";
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

describe("ChallengeHeader", () => {
  it("should render the challenge header with section", () => {
    renderWithRedux(<ChallengeHeader />, { challenges: { current: challenge, list: [challenge], loading: false, submission: submission } });
    const challengeheader = screen.getByTestId("challengeHeaderId");
    expect(challengeheader).toBeInTheDocument();
    expect(screen.getByText("communities.challenge.title")).toBeInTheDocument();
    expect(screen.getByText(challenge.name)).toBeInTheDocument();
    expect(screen.getByText(challenge.description)).toBeInTheDocument();
  });
});

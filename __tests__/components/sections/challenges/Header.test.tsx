import ChallengeHeader from "@/components/sections/challenges/Header";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import { mockChallenge } from "../../../../__mocks__/challenge";
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


describe("ChallengeHeader", () => {
  it("should render the challenge header with section", () => {
    renderWithRedux(<ChallengeHeader />, {challenges: { current: mockChallenge, list: [mockChallenge], loading: false, submission: mockSubmission },
  });
    const challengeheader = screen.getByTestId("challengeHeaderId");
    expect(challengeheader).toBeInTheDocument();
    expect(screen.getByText("communities.challenge.title")).toBeInTheDocument();
    expect(screen.getByText(mockChallenge.name)).toBeInTheDocument();
    expect(screen.getByText(mockChallenge.description)).toBeInTheDocument();
  });
});

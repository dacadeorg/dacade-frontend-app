import ChallengeHeader from "@/components/sections/challenges/Header";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import { challenge } from "../../../../__mocks__/course";
import { useSelector } from "react-redux";
// import { Course } from "../../../../__mocks__/course";

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

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("ChallengeHeader", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((callback) => callback({ challenges: { current: challenge } }));
  });
  it("should render the challenge header with section", () => {
    renderWithRedux(<ChallengeHeader />);
    const challengeheader = screen.getByTestId("challengeHeaderId");
    expect(challengeheader).toBeInTheDocument();
    expect(screen.getByText("communities.challenge.title")).toBeInTheDocument();
    expect(screen.getByText(challenge.name)).toBeInTheDocument();
    expect(screen.getByText(challenge.description)).toBeInTheDocument();
  });
});

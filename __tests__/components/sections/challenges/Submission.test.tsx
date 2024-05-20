import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import Submission from "@/components/sections/challenges/Submission";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import { challenge as mockChallenge, mockTeam, submission } from "../../../../__mocks__/challenge";

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

describe("Submission", () => {
  const challenge = mockChallenge();
  it("renders the submission form", () => {
    renderWithRedux(<Submission />);
    const submissionForm = screen.getByTestId("submission-form");
    expect(submissionForm).toBeInTheDocument();
  });

  it("renders the submission section", async () => {
    renderWithRedux(<Submission />, {
      challenges: { current: challenge, list: [challenge], loading: false, submission: submission() },
      teams: { current: mockTeam, loading: true },
    });
    const submissionsClosed = challenge?.expiresAt ? Date.parse(challenge?.expiresAt) < Date.now() : false;
    if (submissionsClosed) {
      expect(screen.getByText("communities.overview.challenge.submissions-closed")).toBeInTheDocument();
    } else if (challenge.isTeamChallenge) {
      expect(screen.getByText("communities.overview.challenge.submission.description")).toBeInTheDocument();
    }
  });
});

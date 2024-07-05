import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { challenge, submission } from "@__mocks__/fixtures/challenge";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import BestSubmissions from "@/components/sections/submissions/BestSubmissions";

jest.mock("next/router", () => ({
  useRouter: () => ({
    asPath: "next",
    query: { challenge_id: "test-challenge-id", slug: "test-community-slug" },
    pathname: "/communities/test-community-slug/challenges/test-challenge-id",
  }),
}));

const mockBestSubmissions = {
  challenges: {
    current: {
      ...challenge,
      bestSubmissions: [submission],
    },
    list: [challenge],
    submission: submission,
    loading: true,
  },
};

describe("BestSubmissions Component", () => {
  it("Should render best submissions when they exist", () => {
    renderWithRedux(<BestSubmissions testId="bestSubmissionId" />, mockBestSubmissions);
    const bestSubmission = screen.getByTestId("bestSubmissionId");
    expect(bestSubmission).toBeInTheDocument();
    mockBestSubmissions.challenges.current.bestSubmissions.forEach((submission) => {
      expect(screen.getByText(submission.text)).toBeInTheDocument();
    });
  });

  it("Should render the link to submissions path", () => {
    renderWithRedux(<BestSubmissions testId="bestSubmissionId" />, mockBestSubmissions);
    const link = screen.getByRole("link", { name: /challenge.best-submissions.button/i });
    expect(link).toHaveAttribute("href", "/communities/test-community-slug/challenges/test-challenge-id/submissions");
  });
});

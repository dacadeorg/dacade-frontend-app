import "@testing-library/jest-dom";
import { renderWithRedux } from "../../../../../__mocks__/renderWithRedux";
import { screen } from "@testing-library/react";
import SubmissionCard from "@/components/sections/submissions/_partials/SubmissionCard";
import { submission } from "../../../../../__mocks__/fixtures/challenge";

jest.mock("next/router", () => ({
  useRouter: () => ({
    asPath: "next",
    query: { challenge_id: "test-challenge-id", slug: "test-community-slug" },
    pathname: "/communities/test-community-slug/challenges/test-challenge-id",
  }),
}));

describe("Submission Card", () => {
  beforeEach(()=>{
    renderWithRedux(<SubmissionCard submission={submission} />);
  })
  it("should render submission card", () => {
    const submissionCard = screen.getByTestId("submissionCardId");
    expect(submissionCard).toBeInTheDocument();
  });
  it("should display the user's display name", () => {
    const displayName = screen.getByText(submission.user.displayName);
    expect(displayName).toBeInTheDocument();
  });

  it("should display the submission text", () => {
    const submissionText = screen.getByText(submission.text);
    expect(submissionText).toBeInTheDocument();
  });

  it("should display the submission status", () => {
    const submissionDate = screen.getByText(/submissions.submitted/);
    expect(submissionDate).toBeInTheDocument();
  });

  it("should display evaluation points", () => {
    const evaluationPoints = screen.getByText(submission.metadata.evaluation.points.toString());
    expect(evaluationPoints).toBeInTheDocument();
  });

  it("should have a link to the submission details", () => {
    const mockSubmission = submission;
    const communitySlug = "test-community-slug";
    const submissionId = mockSubmission.id;
    const submissionLink = screen.getByRole("link");
    expect(submissionLink).toBeInTheDocument();
    expect(submissionLink).toHaveAttribute("href", `/communities/${communitySlug}/challenges/test-challenge-id/submissions/${submissionId}`);
  });
});

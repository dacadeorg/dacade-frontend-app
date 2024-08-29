import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import SubmissionCard from "@/components/cards/Submission";
import { useRouter } from "next/router";
import { submission } from "@__mocks__/fixtures/challenge";
import { renderWithRedux } from "@__mocks__/renderWithRedux";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));


describe("SubmissionCard", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      asPath: "/submissions",
      push: jest.fn(),
    });
  });

  it("renders the submission card with correct content", () => {
    renderWithRedux(
      <SubmissionCard submission={submission}>
        <div>testing children</div>
      </SubmissionCard>
    );
    expect(screen.getByTestId("submissionId")).toBeInTheDocument();
    expect(screen.getByText("Submission")).toBeInTheDocument();
    expect(screen.getByText("testing children")).toBeInTheDocument();
  });

  it("displays evaluation points when available", () => {
    renderWithRedux(<SubmissionCard submission={submission} />);
    expect(screen.getByTestId("badgeId")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("submissions.evaluation.points")).toBeInTheDocument();
  });

  it("displays feedback count when available", () => {
    renderWithRedux(<SubmissionCard submission={submission} />);
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("submissions.feedback.feedbacks")).toBeInTheDocument();
  });
});

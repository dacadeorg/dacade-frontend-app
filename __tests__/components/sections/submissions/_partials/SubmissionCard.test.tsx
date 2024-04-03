import SubmissionCard from "@/components/sections/submissions/_partials/SubmissionCard";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { mockSubmission } from "../../../../../__mocks__/bounty";
import ReduxProvider from "../../../../../__mocks__/provider/ReduxProvider";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
  }),
}));

describe("SubmissionCard", () => {
  it("should render submission card", () => {
    render(
      <ReduxProvider>
        <SubmissionCard submission={mockSubmission} />
      </ReduxProvider>
    );
    const submissionCard = screen.getByTestId("submissionCardId");
    expect(submissionCard).toBeInTheDocument();
  });
});

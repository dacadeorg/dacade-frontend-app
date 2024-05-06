import "@testing-library/jest-dom";
import {screen} from "@testing-library/react";
import Submission from "@/components/sections/challenges/Submission";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";

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
  it("renders the submission form", () => {
    renderWithRedux(
          <Submission />
    );
    const submissionForm = screen.getByTestId("submission-form")
    expect(submissionForm).toBeInTheDocument();
  });

  it("renders the submission section", async () => {
    renderWithRedux(
          <Submission />
    );
    const submissionSection = screen.getByText("communities.challenge.submission");
    expect(submissionSection).toBeInTheDocument()
  });
});
import View from "@/components/sections/submissions/View";
import { submission } from "../../.../../../../__mocks__/fixtures/challenge";
import { renderWithRedux } from "../.../../../../../__mocks__/renderWithRedux";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

jest.mock("next/router", () => ({
  useRouter: () => ({
    asPath: "next",
  }),
}));

const mockStateWithSubmission = {
  submissions: {
    current: {
      ...submission,
    },
    list: [submission],
    text: "",
  },
};

const mockStateWithNoSubmission = {
  submissions: {
    current: null,
    list: [],
    text: "",
  },
};
describe("View component", () => {
  it("Should render the submission view card and evaluation", () => {
    renderWithRedux(<View />, mockStateWithSubmission);
    expect(screen.getByTestId("viewId")).toBeInTheDocument();
    // TODO: add this test once the pr for testing evaluations is merged
    // expect(screen.getByTestId("evaluationsId")).toBeInTheDocument();
    expect(screen.getByTestId("feedbackId")).toBeInTheDocument();
  });
  it("Should display a message when submission is not available", () => {
    renderWithRedux(<View />, mockStateWithNoSubmission);
    expect(screen.getByText("communities.challenge.submission.no.feedbacks")).toBeInTheDocument();
  });
});

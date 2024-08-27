import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { useRouter } from "next/router";
import List from "@/components/sections/submissions/List";
import { submission } from "../../.../../../../__mocks__/fixtures/challenge";
import React from "react";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const mockState = {
  submissions: {
    current: {
      ...submission,
    },
    list: [submission, submission, submission],
    hasMore: true,
    text: "",
  },
};

const mockEmptyState = {
  submissions: {
    current: {
      ...submission,
    },
    list: [],
    hasMore: false,
    text: "",
  },
};

describe("List Component", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { challenge_id: "1" },
    });
  });

  it("Should render the List component with submissions", () => {
    renderWithRedux(<List />, mockState);
    const listElement = screen.getByTestId("listId");
    expect(listElement).toBeInTheDocument();
    const submissionCardElements = screen.getAllByTestId("submissionId");
    expect(submissionCardElements.length).toBe(mockState.submissions.list.length);
  });

  it("Should render the empty state when there are no submissions", () => {
    renderWithRedux(<List />, mockEmptyState);
    const emptyStateTitle = screen.getByText(/submissions.empty-state.title/i);
    expect(emptyStateTitle).toBeInTheDocument();
  });
});

import SubmissionList from "@/components/sections/profile/communities/List";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../../__mocks__/renderWithRedux";
import { mockCommunity } from "../../../../../__mocks__/community";
import { mockCourse } from "../../../../../__mocks__/course";
import { fixtureSubmission } from "../../../../../__mocks__/challenge";
import { fixtureFeedback } from "../../../../../__mocks__/feedback";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("SubmissionList", () => {
  const submissions = fixtureSubmission();
  it("should render the achievement view item", () => {
    renderWithRedux(<SubmissionList />, {
      community: { current: mockCommunity, list: [mockCommunity], courses: [mockCourse], error: "error message", status: "succeeded" },
      submissions: { current: submissions, list: [submissions], text: "submissions" },
      feedback: { current: fixtureFeedback, list: [fixtureFeedback] },
    });
    expect(screen.getByTestId("SubmissionListId")).toBeInTheDocument();
  });
});

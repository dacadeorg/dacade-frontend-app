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
  it("should render the achievement view item", () => {
    renderWithRedux(<SubmissionList />, {
      community: { current: mockCommunity, list: [mockCommunity], courses: [mockCourse], error: "error message", status: "succeeded" },
      submissions: { current: fixtureSubmission(), list: [fixtureSubmission()], text: "submissions" },
      feedback: { current: fixtureFeedback, list: [fixtureFeedback] },
    });
    expect(screen.getByTestId("SubmissionListId")).toBeInTheDocument();
    const submission = [fixtureSubmission()];
    if(submission && submission.length !== 0) {
        submission.forEach((submissions) => {
            expect(screen.getByText(submissions.reward.amount +  submissions.reward.token)).toBeInTheDocument()
        })
    }
  });

});

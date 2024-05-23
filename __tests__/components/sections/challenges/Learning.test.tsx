import Learning from "@/components/sections/challenges/Learning";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { mockCommunity } from "../../../../__mocks__/community";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import { mockCourse, mockLearningModule } from "../../../../__mocks__/course";
import { challenge, submission } from "../../../../__mocks__/challenge";

describe("Learning", () => {
  it("should render Learning", () => {
    renderWithRedux(<Learning testId="learningId" courses={[]} learningModules={[]} community={mockCommunity} />);
    const learning = screen.getByTestId("learningId");
    expect(learning).toBeInTheDocument();
    expect(screen.getByText("communities.overview.challenge.learning.title")).toBeInTheDocument();
  });

  it("should render with courses", () => {
    const coursesArray = [mockCourse];
    renderWithRedux(<Learning courses={[mockCourse]} learningModules={[mockLearningModule]} community={mockCommunity} />, {
      challenges: { current: challenge(), list: [challenge()], loading: false, submission: submission() },
    });
    coursesArray.forEach((course) => {
      expect(screen.getByText(course.name)).toBeInTheDocument();
      expect(screen.getByText(course.description)).toBeInTheDocument();
    });
  });

  it("should render with learning", () => {
    const learningArray = [mockLearningModule];
    renderWithRedux(<Learning courses={[mockCourse]} learningModules={[mockLearningModule]} community={mockCommunity} />);
    learningArray.forEach((learningModule) => {
      expect(screen.getByText(learningModule.title)).toBeInTheDocument();
      expect(screen.getByText(learningModule.description)).toBeInTheDocument();
    });
  });
});
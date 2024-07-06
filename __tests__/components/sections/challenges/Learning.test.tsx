import Learning from "@/components/sections/challenges/Learning";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import { challenge, submission } from "@__mocks__/fixtures/challenge";
import { mockCourse, mockLearningModule } from "@__mocks__/fixtures/course";
import { mockCommunity } from "@__mocks__/fixtures/community";

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
      challenges: { current: challenge, list: [challenge], loading: false, submission: submission },
    });
    coursesArray.forEach((course) => {
      const courseNameElement = screen.getByText(course.name);
      const courseDescriptionElement = screen.getByText(course.description);
      expect(courseNameElement).toBeInTheDocument();
      expect(courseNameElement).toHaveTextContent(course.name);
      expect(courseDescriptionElement).toBeInTheDocument();
      expect(courseDescriptionElement).toHaveTextContent(course.description);
    });
  });

  it("should render with learning", () => {
    const learningArray = [mockLearningModule];
    renderWithRedux(<Learning courses={[mockCourse]} learningModules={[mockLearningModule]} community={mockCommunity} />);
    learningArray.forEach((learningModule) => {
      const learningTitleElement = screen.getByText(learningModule.title);
      const learningDescriptionElement = screen.getByText(learningModule.description);
      expect(learningTitleElement).toBeInTheDocument();
      expect(learningTitleElement).toHaveTextContent(learningModule.title);
      expect(learningDescriptionElement).toBeInTheDocument();
      expect(learningDescriptionElement).toHaveTextContent(learningModule.description);
    });
  });
});

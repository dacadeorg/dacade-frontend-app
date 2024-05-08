import Learning from "@/components/sections/challenges/Learning";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { community } from "../../../../__mocks__/community";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import { mockCourse, mockLearningModule } from "../../../../__mocks__/course";
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

describe("Learning", () => {
  it("should render Learning", () => {
    renderWithRedux(<Learning courses={[]} learningModules={[]} community={community} />);
    const learning = screen.getByTestId("learningId");
    expect(learning).toBeInTheDocument();
    expect(screen.getByText("communities.overview.challenge.learning.title")).toBeInTheDocument();
  });

  it("should render with courses", () => {
    const coursesArray = [mockCourse];
    renderWithRedux(<Learning courses={[mockCourse]} learningModules={[mockLearningModule]} community={community} />);
    coursesArray.forEach((course) => {
      expect(screen.getByText(course.name)).toBeInTheDocument();
      expect(screen.getByText(course.description)).toBeInTheDocument();
    });
  });

  it("should render with learning", () => {
    const learningArray = [mockLearningModule];
    renderWithRedux(<Learning courses={[mockCourse]} learningModules={[mockLearningModule]} community={community} />);
    learningArray.forEach((learningModule) => {
      expect(screen.getByText(learningModule.title)).toBeInTheDocument();
      expect(screen.getByText(learningModule.description)).toBeInTheDocument();
    });
  });
});

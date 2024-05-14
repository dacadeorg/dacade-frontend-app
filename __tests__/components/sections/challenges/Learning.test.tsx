import Learning from "@/components/sections/challenges/Learning";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import { setupServer } from "msw/node";
import { handlers } from "../../../../__mocks__/provider/handlers";
import { mockSubmission } from "../../../../__mocks__/bounty";
import { mockCommunity } from "../../../../__mocks__/community";
import { mockCourse, mockLearningModule } from "../../../../__mocks__/course";
import { mockChallenge } from "../../../../__mocks__/challenge";

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
  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render course being learned", () => {
    renderWithRedux(<Learning courses={[]} learningModules={[]} community={mockCommunity} />);
    const learning = screen.getByTestId("learningId");
    expect(learning).toBeInTheDocument();
    expect(screen.getByText("communities.overview.challenge.learning.title")).toBeInTheDocument();
  });

  it("should render with courses", () => {
    const coursesArray = [mockCourse];
    renderWithRedux(<Learning courses={[mockCourse]} learningModules={[mockLearningModule]} community={mockCommunity} />, {
      challenges: { current: mockChallenge, list: [mockChallenge], loading: false, submission: mockSubmission },
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

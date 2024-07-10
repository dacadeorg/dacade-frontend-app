import Learning, { LearningProps } from "@/components/cards/challenge/_partials/Learning";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

jest.mock("next-i18next", () => ({
  useTranslation: jest.fn().mockReturnValue({
    t: (key: string) => key,
  }),
}));

const learningProps: LearningProps = {
  title: "Learning Title",
  description: "This is the learning description.",
  link: "/learning-link",
};

function RenderLearning(props: LearningProps = learningProps) {
  renderWithRedux(<Learning {...props} />);
}

describe("Learning", () => {
  it("should render the Learning component", () => {
    RenderLearning();
    expect(screen.getByTestId("learning-component")).toBeInTheDocument();
  });

  it("should display the title and description", () => {
    RenderLearning();
    expect(screen.getByTestId("learning-title")).toHaveTextContent(learningProps.title);
    expect(screen.getByTestId("learning-description")).toHaveTextContent(learningProps.description);
  });

  it("should have a link with the correct URL", () => {
    RenderLearning();
    const linkElement = screen.getByRole("link", { name: /communities.overview.challenge.learning.start/i });
    expect(linkElement).toHaveAttribute("href", learningProps.link);
  });

  it("should render the ArrowButton with the correct text", () => {
    RenderLearning();
    expect(screen.getByText("communities.overview.challenge.learning.start")).toBeInTheDocument();
  });
});

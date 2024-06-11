import "@testing-library/jest-dom";
import LearningModules from "@/components/sections/courses/overview/LearningModules";
import LearningModulesCard from "@/components/cards/Learning";
import { render, screen } from "@testing-library/react";
import { mockCourse } from "../../../../../__mocks__/course";
import { LearningModule } from "@/types/course";

interface LearningModuleProps {
  key: number;
  learningModule: LearningModule[];
}

const RenderLearningModule = (props?: LearningModuleProps) => {
  render(<LearningModulesCard {...props} key={1} learningModule={[mockCourse.learningModules]}/>);
  return screen.getByTestId("learningModulesCardId");
};

describe("LearningModules", () => {
  it("should render the Learning Modules", () => {
    render(<LearningModules />);
    const learningModules = screen.getByTestId("learningModulesId");
    expect(learningModules).toBeInTheDocument();
    expect(learningModules).toHaveTextContent("0");
  });
  
  it("should show Learning Modules List", () => {
      const learningModulesCard = RenderLearningModule();
      expect(learningModulesCard).toBeInTheDocument();
  
  });
});

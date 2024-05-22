import "@testing-library/jest-dom";
import LearningModules from "@/components/sections/courses/overview/LearningModules";
// import LearningModulesCard from "@/components/cards/Learning";
import { render, screen } from "@testing-library/react";
// import { course } from "../../../../../__mocks__/course;";
// import { learningModule } from "../../__mocks__/learningModule.ts";
import ReduxProvider from "../../../../../__mocks__/provider/ReduxProvider";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    isFallback: false,
  }),
}));

// const learningModulesProps = {
//     course: course,
    
// }

const RenderLearningModules = () => {
  render(
    <ReduxProvider>
      <LearningModules/>
    </ReduxProvider>
  );
  return screen.getByTestId("-show");
}

describe("LearningModules", () => {
  it("should render the Learning Modules", () => {
    const learningModules = RenderLearningModules();
    expect(learningModules).toBeInTheDocument();
  });
  
  it("should show Learning Modules List", () => {
    const learningModulesCard = screen.getByTestId("learning-modules-card");
    expect(learningModulesCard).toBeInTheDocument();
  });
});
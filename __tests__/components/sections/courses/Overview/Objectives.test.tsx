import "@testing-library/jest-dom";
import Objectives from "@/components/sections/courses/overview/Objectives";
import ObjectiveList from "@/components/sections/courses/overview/Objectives";
import { render, screen } from "@testing-library/react";
import { mockCourse } from "../../../../../__mocks__/course";

interface ObjectiveListProps {
  objectives: [];
}


const RenderObjectiveList = (props?: ObjectiveListProps) => {
  render(<ObjectiveList {...props} objectives={mockCourse.objectives}/>);
  return screen.getByTestId("objectivesListShow");
};


describe("Objectives", () => {

  it("should render the Objectives", () => {
    render(<Objectives/>)
    const objectives = screen.getByTestId("objectivesShow");
    expect(objectives).toBeInTheDocument();
  });

  it("should show Objective List", () => {
    const objectivesList = RenderObjectiveList();
    expect(objectivesList).toBeInTheDocument();
  });
});
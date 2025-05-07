import "@testing-library/jest-dom";
import Prerequisite from "@/components/sections/courses/overview/Prerequisite";
import { render, screen } from "@testing-library/react";
import { mockCourse } from "../../../../../__mocks__/course";
import ObjectiveList from "@/components/list/Objectives";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    isFallback: false,
  }),
}));

interface ObjectiveListProps {
  objectives: [];
}


const RenderObjectiveList = (props?: ObjectiveListProps) => {
  render(<ObjectiveList {...props} objectives={mockCourse.prerequisite.items}/>);
  return screen.getByTestId("objectivesListShow");
};

describe("Prerequisite", () => {
  it("should render the Prerequisite", () => {
    render( <Prerequisite />)
    const prerequisite =  screen.getByTestId("prerequisiteId");
    expect(prerequisite).toBeInTheDocument();
  });

  it("should render the ObjectiveList", () => {
    const objectiveList =  RenderObjectiveList();
    expect(objectiveList).toBeInTheDocument();
  });
 

});
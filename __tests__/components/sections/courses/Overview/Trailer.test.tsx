
import "@testing-library/jest-dom";
import Trailer from "@/components/sections/courses/overview/Trailer";
import { render, screen } from "@testing-library/react";
import { mockCourse } from "../../../../../__mocks__/course";
import ObjectiveList from "@/components/sections/courses/overview/Trailer";
import Video from "@/components/sections/courses/overview/Trailer";
import Duration from "@/components/sections/courses/overview/Trailer";



interface ObjectiveListProps {
  objectives: [];
}


const RenderObjectiveList = (props?: ObjectiveListProps) => {
  render(<ObjectiveList {...props} objectives={mockCourse.trailer?.info?.items}/>);
  return screen.getByTestId("objectivesListShow");
};


describe("Trailer", () => {
  it("should render the Trailer", () => {
    render(<Trailer />)
    const trailer = screen.getByTestId("trailerId");
    expect(trailer).toBeInTheDocument();
  });

  it("should render the Video", () => {
    render(<Video />)
    const trailerVideo = screen.getByTestId("trailerVideoId");
    expect(trailerVideo).toBeInTheDocument();
  });

  it("should render the Duration", () => {
    render(<Duration />)
    const trailerDuration = screen.getByTestId("trailerDurationId");
    expect(trailerDuration).toBeInTheDocument();
  });

  it("should render the Video Summary", () => {
    const trailerVideoSummary = screen.getByTestId("trailerVideoSummary");
    expect(trailerVideoSummary).toBeInTheDocument();
    expect(trailerVideoSummary).toBe(mockCourse.trailer.description);
  });

  it("should render the Objective List", () => {
    const objectiveList = RenderObjectiveList();
    expect(objectiveList).toBeInTheDocument();
  });

  it("should render course trailer description", () => {
    const trailerText = screen.getByTestId("trailerTextId");
    expect(trailerText).toBeInTheDocument();
    expect(trailerText).toBe(mockCourse.trailer.description);
  });

});
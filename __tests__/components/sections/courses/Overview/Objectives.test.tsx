import "@testing-library/jest-dom";
import Objectives from "@/components/sections/courses/overview/Objectives";
import { render, screen } from "@testing-library/react";
import ReduxProvider from "../../../../../__mocks__/provider/ReduxProvider";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    isFallback: false,
  }),
}));


const RenderObjectives = () => {
  render(
    <ReduxProvider>
      <Objectives/>
    </ReduxProvider>
  );
  return screen.getByTestId("objectives-show");
}

describe("Objectives", () => {
  it("should render the Objectives", () => {
    const objectives = RenderObjectives();
    expect(objectives).toBeInTheDocument();
  });

  it("should show Objective List", () => {
    const objectivesList = screen.getByTestId("objectives-list-show");
    expect(objectivesList).toBeInTheDocument();
  });
});
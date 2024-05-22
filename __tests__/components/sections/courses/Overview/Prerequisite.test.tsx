import "@testing-library/jest-dom";
import Prerequisite from "@/components/sections/courses/overview/Prerequisite";
import { render, screen } from "@testing-library/react";
// import { course } from "../../__mocks__/course.ts";
import ReduxProvider from "../../../../../__mocks__/provider/ReduxProvider";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    isFallback: false,
  }),
}));


const RenderPrerequisite = () => {
  render(
    <ReduxProvider>
      <Prerequisite />
    </ReduxProvider>
  );
  return screen.getByTestId("prerequisite-show");
}

describe("Prerequisite", () => {
  it("should render the Prerequisite", () => {
    const prerequisite = RenderPrerequisite();
    expect(prerequisite).toBeInTheDocument();
  });
});
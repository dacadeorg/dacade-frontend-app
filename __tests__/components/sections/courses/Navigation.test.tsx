import "@testing-library/jest-dom";
import Navigation from "@/components/sections/courses/Navigation";
import { render, screen } from "@testing-library/react";
// import { course } from "../../__mocks__/course.ts";
import ReduxProvider from "../../../../__mocks__/provider/ReduxProvider";
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    isFallback: false,
  }),
}));


const RenderNavigation = () => {
  render(
    <ReduxProvider>
      <Navigation />
    </ReduxProvider>
  );
  return screen.getByTestId("navigation-show");
}

describe("LearningModules", () => {
  it("should render the Learning Modules", () => {
    const navigation = RenderNavigation();
    expect(navigation).toBeInTheDocument();
  });
});
import "@testing-library/jest-dom";
import AllComponents from "@/components/sections/courses/overview/index";
import { render, screen } from "@testing-library/react";
// import { course } from "../../__mocks__/course.ts";
import ReduxProvider from "../../../../../__mocks__/provider/ReduxProvider";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    isFallback: false,
  }),
}));


const RenderAllComponents = () => {
  render(
    <ReduxProvider>
      <AllComponents />
    </ReduxProvider>
  );
  return screen.getByTestId("all-components-show");
}

describe("All Components", () => {
  it("should render all the components from the index component", () => {
    const allComponents = RenderAllComponents();
    expect(allComponents).toBeInTheDocument();
  });
});
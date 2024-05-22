import "@testing-library/jest-dom";
import Disclaimer from "@/components/sections/courses/overview/Disclaimer";
import { render, screen } from "@testing-library/react";
// import { course } from "../../__mocks__/course.ts";
import ReduxProvider from "../../../../../__mocks__/provider/ReduxProvider";
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    isFallback: false,
  }),
}));


const RenderDisclaimer = () => {
  render(
    <ReduxProvider>
      <Disclaimer />
    </ReduxProvider>
  );
  return screen.getByTestId("disclaimer-show");
}

describe("Disclaimer", () => {
  it("should render the Disclaimer", () => {
    const disclaimerComponent = RenderDisclaimer();
    expect(disclaimerComponent).toBeInTheDocument();
  });

  it("should show disclaimer HTML", () => {
    RenderDisclaimer();
    const courseDisclaimer = screen.getByTestId("disclaimer");
    expect(courseDisclaimer).toBeInTheDocument();
  });
});

import "@testing-library/jest-dom";
import Trailer from "@/components/sections/courses/overview/Trailer";
import { render, screen } from "@testing-library/react";
// import { course } from "../../__mocks__/course.ts";
import ReduxProvider from "../../../../../__mocks__/provider/ReduxProvider";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    isFallback: false,
  }),
}));


const RenderTrailer = () => {
  render(
    <ReduxProvider>
      <Trailer />
    </ReduxProvider>
  );
  return screen.getByTestId("trailer-show");
}

describe("Trailer", () => {
  it("should render the Trailer", () => {
    const trailer = RenderTrailer();
    expect(trailer).toBeInTheDocument();
  });
});
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Description from "@/components/sections/courses/overview/Description";
// import { course } from "../../__mocks__/course.ts";
import ReduxProvider from "../../../../../__mocks__/provider/ReduxProvider";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    isFallback: false,
  }),
}));

const RenderDescription = () => {
  render(
    <ReduxProvider>
      <Description />
    </ReduxProvider>
  );
  return screen.getByTestId("description-show");
}

describe("Description", () => {
  it("should render the Description", () => {
    const description = RenderDescription();
    expect(description).toBeInTheDocument();
  });

});
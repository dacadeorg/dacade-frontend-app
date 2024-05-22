
import "@testing-library/jest-dom";
import Rewards from "@/components/sections/courses/overview/Rewards";
import { render, screen } from "@testing-library/react";
// import { course } from "../../__mocks__/course.ts";
import ReduxProvider from "../../../../../__mocks__/provider/ReduxProvider";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    isFallback: false,
  }),
}));


const RenderRewards = () => {
  render(
    <ReduxProvider>
      <Rewards />
    </ReduxProvider>
  );
  return screen.getByTestId("rewards-show");
}

describe("Rewards", () => {
  it("should render the Rewards", () => {
    const rewards = RenderRewards();
    expect(rewards).toBeInTheDocument();
  });
});
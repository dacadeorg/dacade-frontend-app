import "@testing-library/jest-dom";
import Challenge from "@/components/sections/courses/overview/Challenge";
import { render, screen } from "@testing-library/react";
// import { course } from "../../__mocks__/course.ts";
import ReduxProvider from "../../../../../__mocks__/provider/ReduxProvider";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    isFallback: false,
  }),
}));


const RenderChallenge = () => {
  render(
    <ReduxProvider>
      <Challenge />
    </ReduxProvider>
  );
  return screen.getByTestId("challenge-show");
}

describe("Challenge", () => {
  it("should render the Challenge", () => {
    const challenge = RenderChallenge();
    expect(challenge).toBeInTheDocument();
  });

  it("should show", () => {
    RenderChallenge();
    const challengeDescription = screen.getByTestId("challenge-description");
    expect(challengeDescription).toBeInTheDocument();
  });
});
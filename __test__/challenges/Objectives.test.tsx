import "@testing-library/jest-dom";
import Objectives from "@/components/sections/challenges/Objectives";
import { render, screen } from "@testing-library/react";
// import { community } from "../../../../__mocks__/community";
import ReduxProvider from "../../__mocks__/provider/ReduxProvider";
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    isFallback: false,
  }),
}));

const RenderObjectives = () => {
  render(
    <ReduxProvider>
      <Objectives />
    </ReduxProvider>
  );
  return screen.getByTestId("");
}


describe('Objectives', () => {
 
  it("should render the Objectives", () => {
    const objectives  = RenderObjectives();
    expect(objectives).toBeInTheDocument();
  });

  })


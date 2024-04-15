import Objectives from "@/components/sections/challenges/Objectives";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ReduxProvider from "../../../../__mocks__/provider/ReduxProvider";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
  }),
}));

describe("Objectives", () => {
  it("should render objectivies", () => {
    render(
      <ReduxProvider>
        <Objectives />
      </ReduxProvider>
    );
    const objectives = screen.getByTestId("objectiveId");
    expect(objectives).toBeInTheDocument();
  });
});

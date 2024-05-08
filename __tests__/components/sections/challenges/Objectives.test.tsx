import Objectives from "@/components/sections/challenges/Objectives";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";

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

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("Objectives", () => {
  it("should render objectivies", () => {
    renderWithRedux(<Objectives />);
    const objectives = screen.getByTestId("objectiveId");
    expect(objectives).toBeInTheDocument();
    expect(screen.getByText("communities.overview.challenge.objective.title")).toBeInTheDocument();
  });
});

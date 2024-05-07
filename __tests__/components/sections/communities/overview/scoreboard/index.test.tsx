import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../../../__mocks__/renderWithRedux";
import ScoreboardOverview from "@/components/sections/communities/overview/scoreboard";

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

describe("ScoreboardOverview", () => {
  it("displays the scoreboard overview", () => {
    renderWithRedux(<ScoreboardOverview />);
    expect(screen.getByTestId("scoreboardId")).toBeInTheDocument();
  });
});

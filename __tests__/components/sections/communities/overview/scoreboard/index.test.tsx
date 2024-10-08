import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import ScoreboardOverview from "@/components/sections/communities/overview/scoreboard";
import { mockScoreboard } from "@__mocks__/fixtures/scoreboard";

jest.mock("next/router", () => ({
  useRouter: () => ({
    pathname: "next",
  }),
}));
describe("ScoreboardOverview", () => {
  let items = 3;

  const loadMore = () => {
    items = items + 10;
  };

  it("displays the scoreboard overview", () => {
    renderWithRedux(<ScoreboardOverview />, {
      scoreboard: { list: [mockScoreboard], loading: true, filterBy: "" },
    });
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders scoreboard cards when not loading and list is not empty", () => {
    renderWithRedux(<ScoreboardOverview />, {
      scoreboard: { list: [mockScoreboard], loading: false, filterBy: "" },
    });
    if ([mockScoreboard] && [mockScoreboard].length !== 0) {
      [mockScoreboard].slice(0, items).forEach((item) => {
        const displayNameElement = screen.getByText(item.user.displayName);
        expect(displayNameElement).toBeInTheDocument();
        expect(displayNameElement).toHaveTextContent(item.user.displayName)
      });
    } else {
      expect(screen.getByText("communities.scoreboard.empty-state.title")).toBeInTheDocument();
    }
  });

  it("renders button when items are less that the list size", () => {
    renderWithRedux(<ScoreboardOverview />, {
      scoreboard: { list: [mockScoreboard], loading: false, filterBy: "" },
    });
    if (items < [mockScoreboard].length) {
      const button = screen.getByTestId("button");
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
      expect(loadMore).toHaveBeenCalled();
    }
  });
});

import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import BountiesNavigation from "@/components/sections/bounties/Navigation";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    query: "/",
  }),
}));

describe("Navigation", () => {
  it("should render the navigation", () => {
    renderWithRedux(
        <BountiesNavigation />
    );
    const bountiesNavigation = screen.getByTestId("bountiesNavigationId");
    expect(bountiesNavigation).toBeInTheDocument();
  });

  it("should render menu items", () => {
    renderWithRedux(
        <BountiesNavigation />
    );
    const menuItems = screen.getAllByRole("listitem");
    expect(menuItems.length).toBeGreaterThan(0);
  });
});

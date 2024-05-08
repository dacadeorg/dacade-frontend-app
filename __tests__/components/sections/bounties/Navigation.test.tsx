import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import BountiesNavigation from "@/components/sections/bounties/Navigation";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    query: "/",
  })),
}));

const expectedNavItems = ["bounties.navigation.all", "Bounties"];

describe("Navigation", () => {
  it("should render the navigation", () => {
    renderWithRedux(<BountiesNavigation />);
    const bountiesNavigation = screen.getByTestId("bountiesNavigationId");
    expect(bountiesNavigation).toBeInTheDocument();
  });

  it("should render menu items", () => {
    renderWithRedux(<BountiesNavigation />);
    const menuItems = screen.getAllByRole("listitem");
    expect(menuItems.length).toBeGreaterThan(0);
    expect(menuItems).toHaveLength(expectedNavItems.length);
  });
  it("renders links with href", () => {
    renderWithRedux(<BountiesNavigation />);
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("href");
    });
  });
});

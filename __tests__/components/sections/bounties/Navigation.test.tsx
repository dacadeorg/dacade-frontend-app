import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import BountiesNavigation from "@/components/sections/bounties/Navigation";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import { List } from "@/utilities/CommunityNavigation";

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

// const expectedNavItems = ["bounties.navigation.all", "Bounties"];
const expectedNavItems: Omit<List, "id">[] = [
  {
    title: "bounties.navigation",
    items: [
      {
        label: "bounties.navigation.all",
        exact: true,
        link: "/bounties",
      },
    ],
  },
];

describe("Navigation", () => {
  it("should render the navigation", () => {
    renderWithRedux(<BountiesNavigation />);
    const bountiesNavigation = screen.getByTestId("bountiesNavigationId");
    expect(bountiesNavigation).toBeInTheDocument();
  });

  it("should render menu items", () => {
    renderWithRedux(<BountiesNavigation />);
    const menuItems = screen.getAllByRole("listitem");
    menuItems.forEach(() => {
      expectedNavItems.forEach((menu) => {
        if (!menu.hideTitle) {
          const menuTitle = menu.title;
          expect(screen.getByText(menuTitle)).toBeInTheDocument();
        }
      });
    });
  });

  it("renders links with href", () => {
    renderWithRedux(<BountiesNavigation />);
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("href");
    });
  });

  it("renders the item label", () => {
    renderWithRedux(<BountiesNavigation />);
    const menuItems = screen.getAllByRole("listitem");
    menuItems.forEach(() => {
      expectedNavItems.forEach((item) => {
        const itemLabel = item.items.find((item) => item.label);
        const label = itemLabel?.label;
        expect(screen.getByText(label || "")).toBeInTheDocument();
      });
    });
  });
});

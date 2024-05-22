import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import BountiesNavigation from "@/components/sections/bounties/Navigation";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import { List } from "@/utilities/CommunityNavigation";

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: "/",
  }),
}));

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
    renderWithRedux(<BountiesNavigation testId="navigationId"/>)
    const bountiesNavigation = screen.getByTestId("navigationId")
    expect(bountiesNavigation).toBeInTheDocument()
  })

  it("should render the menus", () => {
    renderWithRedux(<BountiesNavigation/>)
    expectedNavItems.forEach((menu)=> {
      if(menu.hideTitle){
        const menuTitle = menu.title;
        expect(screen.getByText(menuTitle)).toBeInTheDocument()
        expect(screen.getByText(menuTitle)).toBe("bounties.navigation")
      }
      menu.items.forEach((item)=> {
        const links = screen.getByRole("link")
        expect(links.hasAttribute("href")).toBeTruthy()
        expect(links.getAttribute("href")).toBe(item.link)
        expect(screen.getByText(item.label)).toBeInTheDocument()
        expect(screen.getByText(item.label).textContent).toBe("bounties.navigation.all")
      })
    })
  })
});

import SideNavigation from "@/components/ui/SideNavigation";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { colors } from "../../../../__mocks__/fixtures/colors";
import { Items } from "@/store/feature/communities/navigation.slice";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import { mockItems } from "../../../../__mocks__/fixtures/menu";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
  }),
}));

const renderSideNavigation = (items: Items[] = []) => {
  return renderWithRedux(
    <SideNavigation items={items} colors={colors}>
      Test
    </SideNavigation>
  );
};

describe("SideNavigation", () => {


  it("should render side navigation", () => {
    renderSideNavigation();
    const sideNav = screen.getByTestId("sideNavId");
    expect(sideNav).toBeInTheDocument();
    expect(sideNav.innerHTML).toContain("Test");
  });

  it("should render navigation items", () => {
    const MOCK_ITEMS_LENGTH = 5;
    const items = Array(MOCK_ITEMS_LENGTH).fill(mockItems);
    renderSideNavigation(items);
    const navItems = screen.getAllByTestId("sidebar-menu-list-container");
    expect(navItems.length).toBe(MOCK_ITEMS_LENGTH);
  });

  it("Should render the items title when titles are set to be visible", () => {
    mockItems.hideTitle = false;
    renderSideNavigation([mockItems]);
    const navTitles = screen.getAllByTestId("sidebar-menu-list-container");
    navTitles.forEach((el, index) => {
      expect(el.firstChild?.textContent).toBe([mockItems][index].title);
    });
  });

  it("Should not render any items title when title are set to be hidden", () => {
    mockItems.hideTitle = true;
    const items = Array<Items>(5).fill(mockItems);
    renderSideNavigation(items);
    const navItems = screen.getAllByTestId("sidebar-menu-list-container");
    navItems.forEach((el, index) => {
      expect(el.firstChild?.textContent).not.toBe(items[index].title);
    });
  });

  it("Render titles only for items with the 'hideTitle' sets to false", () => {
    const items = Array<Items>(5)
      .fill(mockItems)
      .map((el, index) => {
        return index % 2 === 0 ? { ...el, hideTitle: false } : el;
      });

    renderSideNavigation(items);
    const navItems = screen.getAllByTestId("sidebar-menu-list-container");
    navItems.forEach((el, index) => {
      if (items[index].hideTitle) {
        expect(el.firstChild?.textContent).not.toBe(items[index].title);
      } else {
        expect(el.firstChild?.textContent).toBe(items[index].title);
      }
    });
  });
});

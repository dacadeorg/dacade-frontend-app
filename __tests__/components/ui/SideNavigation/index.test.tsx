import SideNavigation from "@/components/ui/SideNavigation";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { colors } from "../../../../__mocks__/colors";
import { Items } from "@/store/feature/communities/navigation.slice";
import ReduxProvider from "../../../../__mocks__/provider/ReduxProvider";

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

describe("SideNavigation", () => {
  const mockItems: Items[] = [
    {
      hideTitle: true,
      title: "Hello",
      id: "1",
      items: [
        {
          id: "menu 1",
          subitems: [
            {
              label: "Menu 1",
              link: "/menu/1",
              exact: true,
            },
          ],
          label: "Menu 1",
          link: "/menu/1",
          exact: true,
        },
        {
          id: "menu 2",
          subitems: [
            {
              label: "Menu 2",
              link: "/menu/2",
              exact: true,
            },
          ],
          label: "Menu 2",
          link: "/menu/2",
          exact: true,
        },
      ],
    },
  ];
  it("should render side navigation", () => {
    render(
      <ReduxProvider>
        <SideNavigation items={[]} colors={colors}>
          <>Test</>
        </SideNavigation>
      </ReduxProvider>
    );
    const sideNav = screen.getByTestId("themeWrapper");
    expect(sideNav).toBeInTheDocument();
    expect(sideNav.innerHTML).toContain("Test");
  });

  it("should render navigation items", () => {
    render(
      <ReduxProvider>
        <SideNavigation items={mockItems} colors={colors}>
          <>Test</>
        </SideNavigation>
      </ReduxProvider>
    );
    const navItems = screen.getAllByTestId("sideNavId");
    expect(navItems.length).toBe(1);
  });
});

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ReduxProvider from "../../../../__mocks__/provider/ReduxProvider";
import BountiesNavigation from "@/components/sections/bounties/Navigation";

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
    render(
      <ReduxProvider>
        <BountiesNavigation />
      </ReduxProvider>
    );
    const bountiesNavigation = screen.getByTestId("bountiesNavigationId");
    expect(bountiesNavigation).toBeInTheDocument();
  });

  it("should render menu items", () => {
    render(
      <ReduxProvider>
        <BountiesNavigation />
      </ReduxProvider>
    );
    const menuItems = screen.getAllByRole("listitem");
    expect(menuItems.length).toBeGreaterThan(0);
  });
});

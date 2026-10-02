import "@testing-library/jest-dom";
import MobileNav from "@/components/sections/courses/MobileNav";
import { render, screen } from "@testing-library/react";
import ReduxProvider from "../../../../__mocks__/provider/ReduxProvider";
import ChevronBottomIcon from "@/icons/chevron-bottom.svg";
import Navigation from "@/components/sections/courses/Navigation";


jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    isFallback: false,
  }),
}));

const RenderMobileNav = () => {
  render(
    <ReduxProvider>
      <MobileNav />
    </ReduxProvider>
  );
  return screen.getByTestId("mobile-nav-show");
}

describe("MobileNav", () => {
  it("should render the Mobile Nav", () => {
    const mobileNav = RenderMobileNav();
    expect(mobileNav).toBeInTheDocument();
  });
});

it("should render the Chevron Bottom Icon Component", () => {
  render( <ChevronBottomIcon /> );
  const mobileNavChevIcon = screen.getByTestId("mobileNavChevIconId");
  expect(mobileNavChevIcon).toBeInTheDocument();
});

it("should render the Component", () => {
  render( <Navigation /> );
  const mobileNavNav = screen.getByTestId("navId");
  expect(mobileNavNav).toBeInTheDocument();
});
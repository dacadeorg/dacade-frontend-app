import "@testing-library/jest-dom";
import MobileNav from "@/components/sections/courses/MobileNav";
import { render, screen } from "@testing-library/react";
import ReduxProvider from "../../../../__mocks__/provider/ReduxProvider";
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
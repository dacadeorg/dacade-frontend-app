import NavItem from "@/components/ui/NavItem";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("NavItem", () => {
  it("should render navitem", () => {
    render(<NavItem>Nav item</NavItem>);
    const navItem = screen.getByTestId("nav-item");
    expect(navItem).toBeInTheDocument();
  });

  it("should render navitem with link", () => {
    render(<NavItem to="/">Nav item</NavItem>);
    const navItemLink = screen.getByTestId("nav-item-link");
    expect(navItemLink).toBeInTheDocument();
    expect(navItemLink).toHaveAttribute("href", "/");
  });
});

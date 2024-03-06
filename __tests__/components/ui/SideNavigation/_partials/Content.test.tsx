import { NavItem } from "@/components/ui/SideNavigation/_partials/Content";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Content", () => {
  const item = {
    label: "Dummy",
    subitems: [{ label: "Dummy", link: "/dummy" }],
  };
  it("should render content", () => {
    render(<NavItem item={item} />);
    const content = screen.getByTestId("contentId");
    expect(content).toBeInTheDocument();
  });

  it("should render style when active", () => {
    render(<NavItem item={item} isActive />);
    const content = screen.getByTestId("contentId");
    expect(content.children[0]).toHaveAttribute("style", "display: !inline-block;");
  });

  it("should render icon", () => {
    render(<NavItem item={item} />);
    const content = screen.getByTestId("contentIcon");
    expect(content).toBeInTheDocument();
  });

  it("should render label", () => {
    render(<NavItem item={item} />);
    const content = screen.getByTestId("contentLabel");
    expect(content).toBeInTheDocument();
    expect(content.textContent).toBe(item.label);
  });
});

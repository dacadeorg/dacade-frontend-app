import LinkContent from "@/components/ui/SideNavigation/_partials/LinkContent";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("LinkContent", () => {
    const item = {
        label: "Test Label",
        subitems: [],
        exact: true, 
        hideTitle: true, 
        title: "Test Title", 
        items: [], 
        link: "/test",
      };
    it("should render the link content", () => {
        render(<LinkContent isActive={true} expanded={true} item={item}/>)
        const linkContent = screen.getByTestId("linkContentId");
        expect(linkContent).toBeInTheDocument()
    });

  it("should render the chevron icon", () => {
    render(<LinkContent isActive={true} expanded={true} item={item} />);
    const chevronIcon = screen.getByTestId("chevronId");
    expect(chevronIcon).toBeInTheDocument();
  });

  it("should not render the chevron icon", () => {
    render(<LinkContent isActive={false} expanded={false} item={item} />);
    const chevronIcon = screen.queryByTestId("chevronId");
    expect(chevronIcon).not.toBeInTheDocument();
  });
})
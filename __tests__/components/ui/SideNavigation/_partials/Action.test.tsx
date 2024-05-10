import { ActivableLink } from "@/components/ui/SideNavigation/_partials/Action";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

const items = {
  link: "/example",
  subitems: [
    { label: "Subitem 1", link: "/example/subitem-1", exact: true },
    { label: "Subitem 2", link: "/example/subitem-2", exact: true },
  ],
};

const goToLinkMock = jest.fn();

describe("Activable link", () => {
  it("should render activable link", () => {
    render(
      <ActivableLink item={items} activeLinkStyle={{}} goToLink={goToLinkMock} isActive>
        Link test
      </ActivableLink>
    );
    const link = screen.getByTestId("activableLinkId");
    expect(link).toBeInTheDocument();
    expect(link.textContent).toBe("Link test");
    fireEvent.click(link.children[0]);
    expect(goToLinkMock).toHaveBeenCalled();
  });

  it("Should not render a link when the subItems are provided", () => {
    render(<ActivableLink item={items}>Link test</ActivableLink>);
    const element = screen.getByTestId("activableLinkId");
    expect(element.tagName).not.toBe("A");
    expect(element.querySelector("a")).toBeNull();
  });

  it("Should have the provided link", () => {
    render(<ActivableLink item={{ link: "/link" }}> Link </ActivableLink>);
    const element = screen.getByTestId("activableLinkId");
    expect(element.querySelector("a")?.getAttribute("href")).toBe("/link");
  });
});

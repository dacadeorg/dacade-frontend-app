import LinkAction, { Item } from "@/components/ui/SideNavigation/_partials/LinkAction";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("LinkAction", () => {
  const item: Item = {
    label: "Example Item",
    link: "/example",
    subitems: [
      { label: "Subitem 1", link: "/example/subitem-1", exact: true },
      { label: "Subitem 2", link: "/example/subitem-2", exact: true },
    ],
    exact: true,
    hideTitle: false,
    items: [],
    title: "Example title",
  };
  const goToLinkMock = jest.fn();
  it("should render a link", () => {
    render(
      <LinkAction item={item} activeLinkStyle={{}} goToLink={goToLinkMock} isActive>
        Link test
      </LinkAction>
    );
    const link = screen.getByTestId("linkActionId");
    expect(link).toBeInTheDocument();
    expect(link.textContent).toBe("Link test");
    fireEvent.click(link.children[0]);
    expect(goToLinkMock).toHaveBeenCalled();
  });
});

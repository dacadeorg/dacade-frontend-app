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
});

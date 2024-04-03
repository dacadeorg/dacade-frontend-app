import { ActivableLink } from "@/components/ui/SideNavigation/_partials/Action";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

const items = {
  subitems: [{ label: "subitem", link: "subitem link" }],
  link: "/dummy",
};
describe("Activable link", () => {
  it("should render the link with subitems", () => {
    render(<ActivableLink item={items}>Link test</ActivableLink>);
    const link = screen.getByTestId("activableLinkId");
    expect(link).toBeInTheDocument();
    expect(link.textContent).toBe("Link test");
  });

  it("should render the link with activable link style", () => {
    render(
      <ActivableLink item={items} isActive>
        Link test
      </ActivableLink>
    );
    const link = screen.getByTestId("activableLinkId");
    expect(link.children[0].tagName).toBe("SPAN");
  });

  it("should invoke goToLink function when clicked", () => {
    const goToLinkMock = jest.fn();
    render(
      <ActivableLink item={items} goToLink={goToLinkMock}>
        Link Text
      </ActivableLink>
    );
    const link = screen.getByTestId("activableLinkId");
    fireEvent.click(link.children[0]);
    expect(goToLinkMock).toHaveBeenCalledTimes(1);
  });
});

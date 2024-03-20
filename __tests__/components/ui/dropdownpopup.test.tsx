import DropdownPopup from "@/components/ui/DropdownPopup";
import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";

const clickOutside = () => {
  fireEvent.mouseDown(document.body);
  fireEvent.mouseUp(document.body);
};

describe("DropDownPopup", () => {
  it("should render the dropdown with children", () => {
    render(
      <DropdownPopup>
        <span>This is the dropdown</span>
      </DropdownPopup>
    );
    const popup = screen.getByTestId("dropdownpopup");
    expect(popup.childElementCount).toBeGreaterThanOrEqual(1);
    expect(popup).toContainHTML("<span>This is the dropdown</span>");
  });

  it("Should invoke the onclickOutside", () => {
    const handleClose = jest.fn();
    render(<DropdownPopup onClose={handleClose} />);
    clickOutside();
    expect(handleClose).toHaveBeenCalled();
  });
});

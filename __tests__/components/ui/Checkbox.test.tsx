import Checkbox from "@/components/ui/Checkbox";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Checkbox", () => {
    it("should render the checkbox", () => {
        render(
        <Checkbox/>
        )
        const checkbox = screen.getByTestId("checkboxId"); 
        expect(checkbox).toBeInTheDocument()
    })

    it("should render the checkbox as disabled", () => {
        render(<Checkbox disabled />);
        const checkbox = screen.getByTestId("checkboxId"); 
        expect(checkbox).toBeDisabled();
    });

    it("should render the checkbox checked", () => {
        render(<Checkbox checked />);
        const checkbox = screen.getByTestId("checkboxId"); 
        expect(checkbox).toBeChecked();
    });

    it("should call the onChange function when checkbox is clicked", () => {
        const onChange = jest.fn();
        render(<Checkbox onChange={onChange} />);
        const checkbox = screen.getByTestId("checkboxId"); 
        expect(checkbox).toBeInTheDocument();
        expect(onChange).not.toHaveBeenCalled();
        fireEvent.click(checkbox);
        expect(onChange).toHaveBeenCalled();
        expect(checkbox).toBeChecked()
        fireEvent.click(checkbox);
        expect(onChange).toHaveBeenCalled();
        expect(checkbox).not.toBeChecked();
    });
})



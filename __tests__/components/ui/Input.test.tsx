import Input from "@/components/ui/Input";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


describe("Input component", () => {
  it("Should render input field with placeholder", () => {
    render(<Input placeholder="Enter your name" />);
    const inputElement = screen.getByPlaceholderText("Enter your name");
    expect(inputElement).toBeInTheDocument();
  });

  it("Should render input field with label", () => {
   render(<Input label="Name" />);
    const labelElement = screen.getByText("Name");
    expect(labelElement).toBeInTheDocument();
  });

  it("Should display error message", () => {
    render(<Input error="This field is required" />);
    const errorMessage = screen.getByText("This field is required");
    expect(errorMessage).toBeInTheDocument();
  });

  it("Should update value", async () => {
    const { getByPlaceholderText } = render(<Input placeholder="Enter your name" />);
    const inputElement = getByPlaceholderText("Enter your name");
    await userEvent.type(inputElement, "John");
    console.log(inputElement, "Elements updated")
    expect(inputElement).toHaveDisplayValue("John");
  });

  it("Should disable input field", () => {
    render(<Input placeholder="Enter your name" disabled />);
    const inputElement = screen.getByPlaceholderText("Enter your name");
    expect(inputElement).toBeDisabled();
  });
});

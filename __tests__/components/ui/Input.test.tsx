import Input from "@/components/ui/Input";
import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";

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

  it("Should update value", () => {
    const { getByPlaceholderText } = render(<Input placeholder="Enter your name" />);
    const inputElement = getByPlaceholderText("Enter your name");
    act(() => {
      fireEvent.change(inputElement, { target: { value: "John" } });
    });
    expect(inputElement).toHaveDisplayValue("John");
  });

  it("Should disable input field", () => {
    render(<Input placeholder="Enter your name" disabled />);
    const inputElement = screen.getByPlaceholderText("Enter your name");
    expect(inputElement).toBeDisabled();
  });
});

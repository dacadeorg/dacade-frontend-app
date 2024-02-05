import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TextInput from "@/components/ui/TextInput";

describe("TextInput", () => {
  it("should render the text input", () => {
    render(<TextInput />);
    const textInput = screen.getByTestId("textarea")
    expect(textInput).toBeInTheDocument();
  });

  it("should display the label", () => {
    render(<TextInput label="Test Label" />);
    const textInput = screen.getByText("Test Label")
    expect(textInput).toBeInTheDocument();
  });

  it("should display error message", () => {
    render(<TextInput error="Test error message" />);
    const textError = screen.getByText("Test error message")
    expect(textError).toBeInTheDocument();
  });
});

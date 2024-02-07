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
    const inputLabel = screen.getByTestId("inputlabel")
    expect(inputLabel).toBeInTheDocument();
    expect(inputLabel).toHaveTextContent("Test Label");
  });

  it("should display error message", () => {
    render(<TextInput error="Test error message" />);
    const inputError = screen.getByTestId("inputerror")
    expect(inputError).toBeInTheDocument();
    expect(inputError).toHaveTextContent("Test error message");
  });
});

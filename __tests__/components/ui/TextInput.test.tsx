import React, { HTMLProps } from "react";
import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import TextInput from "@/components/ui/TextInput";

interface TextInputProps extends HTMLProps<HTMLTextAreaElement> {
  label?: string;
  inputClass?: string;
  error?: string | null;
}

const RenderTextArea = (props?: TextInputProps) => {
  const ref = React.createRef();
  render(<TextInput ref={ref} {...props} label={props?.label} error={props?.error} inputClass={props?.inputClass} />);
  return screen.getByTestId("textarea");
};

describe("TextInput", () => {
  it("should render the text input", () => {
    const textInput = RenderTextArea();
    expect(textInput).toBeInTheDocument();
  });

  it("should display the label", () => {
    RenderTextArea({ label: "Test Label" });
    const inputLabel = screen.getByTestId("inputlabel");
    expect(inputLabel).toBeInTheDocument();
    expect(inputLabel).toHaveTextContent("Test Label");
  });

  it("should display error message", () => {
    RenderTextArea({ error: "Test error message" });
    const inputError = screen.getByTestId("inputerror");
    expect(inputError).toBeInTheDocument();
    expect(inputError).toHaveTextContent("Test error message");
  });

  it("Should accpet the text input", () => {
    const textarea = RenderTextArea({}).getElementsByTagName("textarea")[0];
    act(() =>
      fireEvent.change(textarea, {
        target: {
          value: "test value",
        },
      })
    );
    expect(textarea.value).toBe("test value");
  });
});

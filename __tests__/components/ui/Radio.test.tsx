import Radio from "@/components/ui/Radio";
import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { HTMLProps } from "react";

interface RadioProps extends HTMLProps<HTMLInputElement> {
  communityStyles?: boolean;
}

const RenderRadioInput = (props?: RadioProps) => {
  render(<Radio {...props} communityStyles={props?.communityStyles} />);
  return screen.getByRole("radio") as HTMLInputElement;
};

describe("Radio", () => {
  it("Should render radio input", () => {
    const radioInput = RenderRadioInput();
    expect(radioInput).toBeInTheDocument();
  });

  it("Should be disabled", () => {
    const radioInput = RenderRadioInput({ disabled: true });
    const radioInputDisabled = radioInput.getAttributeNode("disabled");
    expect(radioInput).toHaveAttribute("disabled");
    expect(radioInputDisabled).toBeTruthy();
  });

  it("Should apply community styles", () => {
    const radioInput = RenderRadioInput({ communityStyles: true });
    expect(radioInput.style.color).not.toEqual("");
  });

  it("Should be checked", () => {
    const radioInput = RenderRadioInput();
    act(() => fireEvent.click(radioInput));
    expect(radioInput.checked).toBe(true);
  });

  it("Should not be checked", () => {
    const radioInput = RenderRadioInput();
    expect(radioInput.checked).toBe(false);
  });
});

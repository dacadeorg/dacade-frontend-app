import Radio from "@/components/ui/Radio";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Radio", () => {
  it("Should render radio input", () => {
    render(<Radio />);
    const radioInput = screen.getByRole("radio");
    expect(radioInput).toBeInTheDocument();
  });

  it("Should be disabled", () => {
    render(<Radio disabled />);
    const radioInput = screen.getByRole("radio");
    expect(radioInput).not.toHaveClass("cursor-pointer");
  });

  it("Should apply community styles", () => {
    render(<Radio communityStyles />);
    const radioInput = screen.getByRole("radio");
    expect(radioInput).toHaveStyle({ color: "#fff" });
  });
});

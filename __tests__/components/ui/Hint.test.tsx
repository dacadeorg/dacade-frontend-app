import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Hint from "@/components/ui/Hint";

describe("Hint", () => {
  it("Should render hint", () => {
    render(<Hint>Hint test</Hint>);
    const hint = screen.getByText("Hint test");
    expect(hint).toBeInTheDocument();
  });
});

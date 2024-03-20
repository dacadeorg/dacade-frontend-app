import H3 from "@/components/ui/text/H3";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("H3", () => {
  it("should render H3", () => {
    render(<H3>Hello H3</H3>);
    const h3Content = screen.getByTestId("h3");

    expect(h3Content).toBeInTheDocument();
    expect(h3Content.textContent).toBe("Hello H3");
  });

  it("should apply extra props", () => {
    render(<H3 bold={false}>Hello H3</H3>);
    const h3 = screen.getByTestId("h3");

    expect(h3.className).toContain("font-normal");
  });
});

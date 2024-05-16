import ThemeWrapper from "@/components/wrappers/ThemeWrapper";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("ThemeWrapper", () => {
  it("should render the theme wrapper", () => {
    render(<ThemeWrapper>Theme wrapper</ThemeWrapper>);
    const themeWrapper = screen.getByTestId("themeWrapper");

    expect(themeWrapper).toBeInTheDocument();
    expect(themeWrapper.textContent).toBe("Theme wrapper");
  });
});

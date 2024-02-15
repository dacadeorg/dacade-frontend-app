import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Section from "@/components/ui/Section";

describe("Section", () => {
  it("Should render section", () => {
    render(<Section>Section Child</Section>);
    const section = screen.getByTestId("section");
    expect(section).toBeInTheDocument();
    expect(section.textContent).toBe("Section Child");
  });
});

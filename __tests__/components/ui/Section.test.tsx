import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Section from "@/components/ui/Section";

describe("Section", () => {

  it("Should render section", () => {
    render(<Section>Section Child</Section>);
    const section = screen.getByTestId("section")
    expect(section).toBeInTheDocument();
    expect(section.textContent).toBe("Section Child")
  });

  it("Should render with primary styles", () => {
    render(<Section type="primary">Section Child</Section>);
    const sectionElement = screen.getByTestId("section");
    expect(sectionElement).toHaveClass("bg-primary text-white");
  });

  it("Should render with secondary styles", () => {
    render(<Section type="secondary">Section Child</Section>);
    const sectionElement = screen.getByTestId("section")
    expect(sectionElement).toHaveClass("bg-secondary text-gray-900");
  });

  it("Should render with secondary-light styles", () => {
    render(<Section type="secondary-light">Section Child</Section>);
    const sectionElement = screen.getByTestId("section");
    expect(sectionElement).toHaveClass("bg-gray-50 text-gray-900");
  });
});

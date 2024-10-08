import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SectionWrapper } from "@/components/sections/communities/overview/_partials/SectionWrapper";

describe("SectionWrapper", () => {
  it("renders with title and description", () => {
    const title = "Test Title";
    const description = "Test Description";
    render(
      <SectionWrapper title={title} description={description}>
        <div>Test Children</div>
      </SectionWrapper>
    );
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByText("Test Children")).toBeInTheDocument();
  });

  it("renders without title and description when they are not available", () => {
    render(
      <SectionWrapper>
        <div>Test Children</div>
      </SectionWrapper>
    );
    expect(screen.queryByText("Test Title")).toBe(null);
    expect(screen.queryByText("Test Description")).toBe(null);
    expect(screen.getByText("Test Children")).toBeInTheDocument();
  });
});

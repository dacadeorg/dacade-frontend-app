import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import TestimonialsSection from "@/components/sections/homepage/Testimonials";
import { renderWithRedux } from "@__mocks__/renderWithRedux";

describe("TestimonialsSection", () => {
  it("should render TestimonialsSection with child components", () => {
    renderWithRedux(<TestimonialsSection />);
    expect(screen.getByTestId("testimonialsSectionId")).toBeInTheDocument();
    expect(screen.getByTestId("communityStatsId")).toBeInTheDocument();
    expect(screen.getByTestId("testimonialsId")).toBeInTheDocument();
    expect(screen.getByTestId("openSourceId")).toBeInTheDocument();
    expect(screen.getByTestId("section")).toBeInTheDocument();
  });
});

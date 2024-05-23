import TestimonialsSection from "@/components/sections/homepage/_partials/testimonials/Stories";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import _ from "lodash";

const fixtureTestimonials = {
  content: "testimonials content",
  icon: "/testimonials-icon",
};

describe("Stories", () => {
  it("should display the storis", () => {
    render(<TestimonialsSection testId="testimonialsId" list={[fixtureTestimonials]} />);
    expect(screen.getByTestId("testimonialsId")).toBeInTheDocument();
    const mockGrid = _.chunk([fixtureTestimonials], 5);
    mockGrid.forEach((grid) => {
      grid.forEach(() => {
        const storyImage = screen.getByRole("img");
        expect(storyImage).toBeInTheDocument();
        expect(storyImage.hasAttribute("src")).toBeTruthy();
      });
    });
  });
});

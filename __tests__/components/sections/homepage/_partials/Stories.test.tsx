import "@testing-library/jest-dom";
import TestimonialsSection from "@/components/sections/homepage/_partials/testimonials/Stories";
import { render, screen } from "@testing-library/react";
import _ from "lodash";

const fixtureTestimonials = {
  content: "testimonials content",
  icon: "/testimonials-icon",
};

describe("Stories", () => {
  it("should display the stories", () => {
    render(<TestimonialsSection list={[fixtureTestimonials]} />);
    expect(screen.getByTestId("testimonialsId")).toBeInTheDocument();
    const mockGrid = _.chunk([fixtureTestimonials], 5);
    mockGrid.forEach((grid) => {
      grid.forEach((story) => {
        const storyImage = screen.getByRole("img");
        expect(storyImage).toBeInTheDocument();
        expect(storyImage.hasAttribute("src")).toBeTruthy();
        expect(storyImage.getAttribute("src")).toContain(story.icon.replace("/testimonials-icon", "/_next/image?url=%2Ftestimonials-icon&w=96&q=75"));
        expect(storyImage.hasAttribute("alt")).toBeTruthy();
      });
    });
  });
});

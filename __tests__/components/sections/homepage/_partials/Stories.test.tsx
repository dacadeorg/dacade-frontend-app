import "@testing-library/jest-dom";
import TestimonialsSection from "@/components/sections/homepage/_partials/testimonials/Stories";
import { render, screen } from "@testing-library/react";

const fixtureTestimonials = {
  content: "testimonials content",
  icon: "/testimonials-icon",
};

describe("Stories", () => {
  it("should display each story correctly", () => {
    render(<TestimonialsSection list={Array(10).fill(fixtureTestimonials)} />);
    const stories = screen.getAllByRole("img");
    stories.forEach((storyImage) => {
      expect(storyImage).toBeInTheDocument();
      expect(storyImage).toHaveAttribute("src", expect.stringContaining(fixtureTestimonials.icon.replace("/testimonials-icon", "/_next/image?url=%2Ftestimonials-icon&w=96&q=75")));
      expect(storyImage).toHaveAttribute("alt");
    });
  });
});

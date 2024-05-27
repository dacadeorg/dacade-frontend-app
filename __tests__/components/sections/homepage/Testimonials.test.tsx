import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import TestimonialsSection from "@/components/sections/homepage/Testimonials";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";

describe("Testimonials Section", () => {
  const testimonials = [
    {
      icon: "/assets/img/testimonials/CED.jpg",
      content:
        "Dacade helped me to meet people on the same blockchain journey as me and gives access to cool mentors! I like that it rewards you for challenges and helping others.",
    },
    {
      icon: "/assets/img/testimonials/alex.jpg",
      content: "Testimonials text",
    },
  ];

  it("should render testimonials with correct content", () => {
    renderWithRedux(<TestimonialsSection testId="testimonialsId"/>);
    const testimonial = screen.getByTestId("testimonialsId");
    expect(testimonial).toBeInTheDocument();

    testimonials.forEach((testimonial) => {
      expect(screen.getByAltText(testimonial.icon)).toBeInTheDocument();
      expect(screen.getByText(testimonial.content)).toBeInTheDocument();
    });
  });
});

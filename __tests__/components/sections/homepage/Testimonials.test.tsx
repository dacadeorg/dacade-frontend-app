import { render, screen } from "@testing-library/react";
import TestimonialsSection from "@/components/sections/homepage/Testimonials";

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
    render(<TestimonialsSection />);
    expect(screen.getByText("testimonials.community.title")).toBeInTheDocument();
    expect(screen.getByText("footer.open.source")).toBeInTheDocument();

    testimonials.forEach((testimonial) => {
      expect(screen.getByAltText(testimonial.icon)).toBeInTheDocument();
      expect(screen.getByText(testimonial.content)).toBeInTheDocument();
    });
  });
});

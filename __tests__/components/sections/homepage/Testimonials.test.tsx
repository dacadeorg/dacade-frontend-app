import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import TestimonialsSection from "@/components/sections/homepage/Testimonials";

describe("OpenSource", () => {
    it("should render Open Source", () => {
        renderWithRedux(<TestimonialsSection/>)
        expect(screen.getByText("testimonials.community.title")).toBeInTheDocument()
        expect(screen.getByText("footer.open.source")).toBeInTheDocument()
     })
  });
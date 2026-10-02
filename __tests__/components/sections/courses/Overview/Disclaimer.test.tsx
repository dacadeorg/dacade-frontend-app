import "@testing-library/jest-dom";
import Disclaimer from "@/components/sections/courses/overview/Disclaimer";
import { render, screen } from "@testing-library/react";


  it("should render the Disclaimer", () => {
    render(  <Disclaimer />);
    const disclaimerComponent = screen.getByTestId("disclaimerId");;
    expect(disclaimerComponent).toBeInTheDocument();
  });

  it("should show disclaimer HTML", () => {
    const courseDisclaimer = screen.getByTestId("disclaimerSpanId");
    expect(courseDisclaimer).toBeInTheDocument();
  });

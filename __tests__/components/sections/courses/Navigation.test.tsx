import "@testing-library/jest-dom";
import Navigation from "@/components/sections/courses/Navigation";
import { render, screen } from "@testing-library/react";


describe("LearningModules", () => {
  it("should render the Navidation component", () => {
    render( <Navigation />);
    const navigation = screen.getByTestId("navigation-show");
    expect(navigation).toBeInTheDocument();
  });
});
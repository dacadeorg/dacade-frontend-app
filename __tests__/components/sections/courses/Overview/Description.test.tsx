import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Description from "@/components/sections/courses/overview/Description";


it("should render the Description", () => {
  render( <Description />);
  const description = screen.getByTestId("descriptionId");;
  expect(description).toBeInTheDocument();
});


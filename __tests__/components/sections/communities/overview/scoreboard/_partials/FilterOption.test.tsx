import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FilterOption from "@/components/sections/communities/overview/scoreboard/_partials/FilterOption";

describe("FilterOption", () => {
  it("renders with label and is not checked by default", () => {
    const label = "Test Label";
    render(<FilterOption label={label} value="1" data="2" />);
    expect(screen.getByLabelText(label)).toBeInTheDocument();
    expect(screen.getByRole("radio")).not.toBeChecked();
  });

  it("should be disabled when value matches data", () => {
    const label = "Test Label";
    render(<FilterOption label={label} value="1" data="1" />);
    const radio = screen.getByRole("radio");
    expect(radio).toBeDisabled();
  });
});

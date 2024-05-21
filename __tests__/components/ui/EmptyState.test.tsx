import EmptyState from "@/components/ui/EmptyState";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("EmptyState", () => {
  it("should render the empty state with a title", () => {
    render(<EmptyState title="Empty state title" />);
    const emptysatatecomponent = screen.getByText("Empty state title");
    expect(emptysatatecomponent).toBeInTheDocument();
  });

  it("should render the empty state with a subtitle", () => {
    render(<EmptyState subtitle="Empty state subtitle" />);
    const emptysatatecomponent = screen.getByText("Empty state subtitle");
    expect(emptysatatecomponent).toBeInTheDocument();
  });
});

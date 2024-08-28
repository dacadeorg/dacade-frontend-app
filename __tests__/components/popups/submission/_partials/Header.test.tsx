import SubmissionPopup from "@/components/popups/submission/_partials/Header";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

describe("SubmissionPopup", () => {
  const mockOnClose = jest.fn();


  it("renders the component with correct text", () => {
    render(<SubmissionPopup onClose={mockOnClose} />);
    expect(screen.getByText("communities.submission")).toBeInTheDocument();
  });

  it("calls onClose when clicking the arrow icon", () => {
    render(<SubmissionPopup onClose={mockOnClose} />);

    const arrowButton = screen.getByText("communities.submission").parentElement;
    fireEvent.click(arrowButton!);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("calls onClose when clicking the close button", () => {
    render(<SubmissionPopup onClose={mockOnClose} />);
    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

});

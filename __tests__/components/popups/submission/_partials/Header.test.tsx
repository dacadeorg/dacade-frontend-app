import SubmissionPopup from "@/components/popups/submission/_partials/Header";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

describe("SubmissionPopup", () => {
  const mockOnClose = jest.fn();


  it("renders the component with correct text", () => {
    render(<SubmissionPopup onClose={mockOnClose} />);
    expect(screen.getByText("communities.submission")).toBeInTheDocument();
  });

  it("Invokes the onClose function when the arrow icon is clicked", () => {
    render(<SubmissionPopup onClose={mockOnClose} />);
    const arrowButton = screen.getByTestId("arrow-button");
    fireEvent.click(arrowButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("Invokes the onClose function when the close button is clicked", () => {
    render(<SubmissionPopup onClose={mockOnClose} />);
    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

});

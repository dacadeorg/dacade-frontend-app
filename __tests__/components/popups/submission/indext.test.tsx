import SubmissionPopup from "@/components/popups/submission";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
describe("SubmissionPopup", () => {

  const mockOnClose = jest.fn();

  it("renders the popup when show is true", () => {
    renderWithRedux(<SubmissionPopup show={true} onClose={mockOnClose} submissionId="123" />);
    expect(screen.getByTestId("overlay")).toBeInTheDocument();
    expect(screen.getByText("communities.submission")).toBeInTheDocument();
    expect(screen.getByTestId("viewId")).toBeInTheDocument();
  });

  it("does not render  the popup when show is false", () => {
    renderWithRedux(<SubmissionPopup show={false} onClose={mockOnClose} submissionId="123" />);
    expect(screen.queryByTestId("overlay")).not.toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    renderWithRedux(<SubmissionPopup show={true} onClose={mockOnClose} submissionId="123" />);
    const buttonElement = screen.getByText("communities.submission").parentElement;
    fireEvent.click(buttonElement!);
    expect(mockOnClose).toHaveBeenCalled();
  });
});

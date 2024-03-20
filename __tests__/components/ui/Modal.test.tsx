import Modal from "@/components/ui/Modal";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Modal component", () => {
  it("should render the modal", () => {
    const handleClose = jest.fn();
    render(
      <Modal show={true} onClose={handleClose}>
        <div>Test Content</div>
      </Modal>
    );
    const modal = screen.getByTestId("modal-overlay");

    expect(modal).toBeInTheDocument();
  });

  it("should not render the modal when hidden", () => {
    const handleClose = jest.fn();
    render(
      <Modal show={false} onClose={handleClose}>
        <div>Test Content</div>
      </Modal>
    );

    const modal = screen.queryByTestId("modal-overlay");
    expect(modal).not.toBeInTheDocument();
});

});

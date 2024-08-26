import Certificate from "@/components/ui/Certificate";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ReactComponent from "@__mocks__/svg";

describe("Certificate", () => {
  it("should render certificate", () => {
    render(<Certificate />);
    const certificate = screen.getByTestId("certificateId");
    expect(certificate).toBeInTheDocument();
  });

  it("should render the correct certificate icon based on the name", () => {
    const { getByTestId } = render(<Certificate name="sui" />);
    const certificate = getByTestId("certificateId");
    expect(certificate.innerHTML).toContain(ReactComponent);
  });
});

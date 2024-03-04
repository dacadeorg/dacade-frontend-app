import Certificate from "@/components/ui/Certificate";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Certificate", () => {
    it("should render certificate", () => {
        render(<Certificate/>)
        const certificate = screen.getByTestId("certificateId")
        expect(certificate).toBeInTheDocument()
    })

    it("should render certificate with custom size and shape", () => {
        render(<Certificate size="small" shape="rounded" />)
        const certificate = screen.getByTestId("certificateId")
        expect(certificate).toBeInTheDocument()
    })

})
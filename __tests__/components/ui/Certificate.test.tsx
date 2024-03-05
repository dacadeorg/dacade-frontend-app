import Certificate from "@/components/ui/Certificate";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock("@/icons/certificates/Celo.svg", () => "CeloIcon");
jest.mock("@/icons/certificates/Algoland.svg", () => "AlgolandIcon");
jest.mock("@/icons/certificates/Blockchain.svg", () => "BlockChainIcon");
jest.mock("@/icons/certificates/Eternity.svg", () => "EthIcon");
jest.mock("@/icons/certificates/Near.svg", () => "NearIcon");
jest.mock("@/icons/certificates/Icp.svg", () => "IcpIcon");
jest.mock("@/icons/certificates/Ai.svg", () => "AiIcon");
jest.mock("@/icons/certificates/Solidity.svg", () => "SolidityIcon");
jest.mock("@/icons/certificates/Sui.svg", () => "SuiIcon");

describe("Certificate", () => {
    it("should render certificate", () => {
        render(<Certificate/>)
        const certificate = screen.getByTestId("certificateId")
        expect(certificate).toBeInTheDocument()
    })

    it("should render the correct certificate icon based on the name", () => {
        const { getByTestId } = render(<Certificate name="sui" />);
        const certificate = getByTestId("certificateId");
        expect(certificate).toBeInTheDocument();
        expect(certificate.innerHTML).toContain("<suiicon></suiicon>");
      });
})
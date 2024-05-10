import { ReactElement } from "react";
import CeloIcon from "@/icons/certificates/Celo.svg";
import AlgolandIcon from "@/icons/certificates/Algoland.svg";
import BlockChainIcon from "@/icons/certificates/Blockchain.svg";
import EthIcon from "@/icons/certificates/Eternity.svg";
import NearIcon from "@/icons/certificates/Near.svg";
import IcpIcon from "@/icons/certificates/Icp.svg";
import AiIcon from "@/icons/certificates/Ai.svg";
import Solidity from "@/icons/certificates/Solidity.svg";
import SuiIcon from "@/icons/certificates/Sui.svg";

/**
 * Interface for the coin props
 * @date 3/23/2023 - 11:32:31 AM
 *
 * @interface CertificateProps
 * @typedef {CertificateProps}
 */
interface CertificateProps {
  size?: "medium" | "medium-mini" | "normal" | "small";
  shape?: "rounded" | "squared" | "circle";
  name?: string;
  className?: string;
  testId?: string;
}

/**
 * Array for coins information
 * @date 3/23/2023 - 11:33:07 AM
 *
 * @type {[]}
 */
const certificates = [
  {
    name: "Celo",
    icon: <CeloIcon />,
  },
  {
    name: "icp",
    icon: <IcpIcon />,
  },
  {
    name: "sui",
    icon: <SuiIcon />,
  },
  {
    name: "algorand",
    icon: <AlgolandIcon />,
  },
  {
    name: "near",
    icon: <NearIcon />,
  },
  {
    name: "ethereum",
    icon: <Solidity />,
  },
  {
    name: "blockchain",
    icon: <BlockChainIcon />,
  },
  {
    name: "ae-dev-101",
    icon: <EthIcon />,
  },
  {
    name: "ai",
    icon: <AiIcon />,
  },
];

/**
 * Coin generating function
 * @date 3/22/2023 - 3:25:11 PM
 *
 * @param {CertificateProps} { bgColor, textColor, size = 'normal', shape = 'circle', token }
 * @returns {ReactElement}
 */
export default function Certificate({ size = "medium", shape = "circle", name, className = "", testId = "certificateId" }: CertificateProps): ReactElement {
  const certificate = getCert(name) || getCert("DAC");
  const sizeClasses = getSizeClasses(size);
  const shapeClasses = getShapeClasses(shape);

  function getCert(name?: string) {
    return certificates.find((certificate) => certificate?.name?.toUpperCase() === name?.toUpperCase());
  }

  function getSizeClasses(size: string) {
    switch (size) {
      case "medium":
        return "w-12 h-12 sm:w-15 sm:h-15 text-xl p-1 sm:text-2xl sm:p-2";
      case "medium-mini":
        return "w-12 h-12 sm:w-15 sm:h-15 text-xl sm:text-2xl";
      case "normal":
        return "w-10 h-10 text-xl p-1";
      case "small":
        return "w-4 h-4 text-md p-0.5";
      default:
        return "w-9 h-9 text-lg p-4";
    }
  }

  function getShapeClasses(shape: string) {
    switch (shape) {
      case "rounded":
        return "rounded-xl";
      case "squared":
        return "rounded-none";
      default:
        return "rounded-full";
    }
  }

  return (
    <div data-testid={testId} className={`relative grid place-content-center md:mr-0 ${sizeClasses} ${shapeClasses} ${className}`}>
      {certificate?.icon && certificate.icon}
    </div>
  );
}

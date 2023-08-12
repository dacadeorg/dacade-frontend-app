import { ReactElement } from "react";
import CeloIcon from "@/icons/certificates/Celo.svg";

/**
 * Interface for the coin props
 * @date 3/23/2023 - 11:32:31 AM
 *
 * @interface CertificateProps
 * @typedef {CertificateProps}
 */
interface CertificateProps {
  bgColor?: string;
  textColor?: string;
  size?: "medium" | "medium-mini" | "normal" | "small";
  shape?: "rounded" | "squared" | "circle";
  name?: string;
  className?: string;
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
    textColor: "#FFFFFF",
    bgColor: "#35D07F",
  },
];

/**
 * Coin generating function
 * @date 3/22/2023 - 3:25:11 PM
 *
 * @param {CertificateProps} { bgColor, textColor, size = 'normal', shape = 'circle', token }
 * @returns {ReactElement}
 */
export default function Certificate({ size = "medium", shape = "circle", name, className = "" }: CertificateProps): ReactElement {
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
    <div className={`relative inline-flex items-center justify-items-center text-white uppercase leading-none md:mr-0  ${sizeClasses} ${shapeClasses} ${className}`}>
      {certificate?.icon && certificate.icon}
    </div>
  );
}

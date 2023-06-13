import { ReactElement } from "react";
import DACIcon from "@/icons/tokens/DAC.svg";
import CUSDIcon from "@/icons/tokens/cUSD.svg";
import ETHIcon from "@/icons/tokens/ETH.svg";
import AEIcon from "@/icons/tokens/AE.svg";
import TEZIcon from "@/icons/tokens/Tezos.svg";
import DAIIcon from "@/icons/tokens/DAI.svg";
import NEARIcon from "@/icons/tokens/NEAR.svg";
import USDCIcon from "@/icons/tokens/USDC.svg";

/**
 * Interface for the coin props
 * @date 3/23/2023 - 11:32:31 AM
 *
 * @interface CoinProps
 * @typedef {CoinProps}
 */
interface CoinProps {
  bgColor?: string;
  textColor?: string;
  size?: "medium" | "normal" | "small";
  shape?: "rounded" | "squared" | "circle";
  token?: string;
  className?: string;
}

/**
 * Token interface
 * added here for better visibility
 * @date 5/2/2023 - 12:10:42 PM
 *
 * @interface Token
 * @typedef {Token}
 */
interface Token {
  token: string;
  amount: number;
  ref: string;
}
/**
 * Array for coins information
 * @date 3/23/2023 - 11:33:07 AM
 *
 * @type {[]}
 */
const coins = [
  {
    token: "DAC",
    icon: <DACIcon />,
    bgColor: "#FBBF24",
    textColor: "#FFFFFF",
  },
  {
    token: "cUSD",
    icon: <CUSDIcon />,
    bgColor: "#FCFF52",
    textColor: "#010101",
  },
  {
    token: "ETH",
    icon: <ETHIcon className="w-11 h-11" />,
    bgColor: "#627EEA",
    textColor: "#FFFFFF",
  },
  {
    token: "AE",
    icon: <AEIcon />,
    bgColor: "#DE3F6B",
    textColor: "#FFFFFF",
  },
  {
    token: "tez",
    icon: <TEZIcon />,
    bgColor: "#0D61FF",
    textColor: "#FFFFFF",
  },
  {
    token: "DAI",
    icon: <DAIIcon />,
    bgColor: "#F5AC37",
    textColor: "#FEFEFD",
  },
  {
    token: "NEAR",
    icon: (
      <span className="relative w-full h-auto max-h-full">
        <NEARIcon />
      </span>
    ),
    bgColor: "#000000",
    textColor: "#FFFFFF",
  },
  {
    token: "USDC",
    icon: <USDCIcon />,
    bgColor: "#2775ca",
    textColor: "#FFFFFF",
  },
];

/**
 * Coin generating function
 * @date 3/22/2023 - 3:25:11 PM
 *
 * @param {CoinProps} { bgColor, textColor, size = 'normal', shape = 'circle', token }
 * @returns {ReactElement}
 */
export default function Coin({ bgColor, textColor, size = "medium", shape = "circle", token, className = "" }: CoinProps): ReactElement {
  const coin = getCoin(token) || getCoin("DAC");
  const sizeClasses = getSizeClasses(size);
  const shapeClasses = getShapeClasses(shape);

  function getCoin(_token: Token | string = "") {
    const value = typeof _token === "object" ? _token?.token.toUpperCase() : _token.toUpperCase();
    return coins.find((coin) => coin.token.toUpperCase() === value);
  }

  function getSizeClasses(size: string) {
    switch (size) {
      case "medium":
        return "w-10 h-10 sm:w-15 sm:h-15 text-xl p-1 sm:text-2xl sm:p-2";
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
    <div
      className={`relative overflow-hidden inline-flex items-center justify-items-center text-white uppercase leading-none md:mr-0 mr-2 ${sizeClasses} ${shapeClasses} ${className}`}
      style={{
        backgroundColor: bgColor || coin?.bgColor,
        color: textColor || coin?.textColor,
      }}
    >
      {coin?.icon && coin.icon}
    </div>
  );
}

import { ReactElement } from 'react';
import Image from 'next/image';
import DACIcon from "../../../public/assets/icons/tokens/DAC.svg"
import CUSDIcon from "../../../public/assets/icons/tokens/cUSD.svg"
import ETHIcon from "../../../public/assets/icons/tokens/ETH.svg"
import AEIcon from "../../../public/assets/icons/tokens/AE.svg"
import TEZIcon from "../../../public/assets/icons/tokens/Tezos.svg"
import DAIIcon from "../../../public/assets/icons/tokens/DAI.svg"
import NEARIcon from "../../../public/assets/icons/tokens/NEAR.svg"
import USDCIcon from "../../../public/assets/icons/tokens/USDC.svg"



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
  size?: 'medium' | 'normal' | 'small';
  shape?: 'rounded' | 'squared' | 'circle';
  token: string;
}


/**
 * Array for coins information
 * @date 3/23/2023 - 11:33:07 AM
 *
 * @type {{}}
 */
const coins = [
  {
    token: 'DAC',
    icon: DACIcon,
    bgColor: '#FBBF24',
    textColor: '#FFFFFF',
  },
  {
    token: 'cUSD',
    icon: CUSDIcon,
    bgColor: '#45CD85',
    textColor: '#FFFFFF',
  },
  {
    token: 'ETH',
    icon: ETHIcon,
    bgColor: '#627EEA',
    textColor: '#FFFFFF',
  },
  {
    token: 'AE',
    icon: AEIcon,
    bgColor: '#DE3F6B',
    textColor: '#FFFFFF',
  },
  {
    token: 'tez',
    icon: TEZIcon,
    bgColor: '#0D61FF',
    textColor: '#FFFFFF',
  },
  {
    token: 'DAI',
    icon: DAIIcon,
    bgColor: '#F5AC37',
    textColor: '#FEFEFD',
  },
  {
    token: 'NEAR',
    icon: NEARIcon,
    bgColor: '#000000',
    textColor: '#FFFFFF',
  },
  {
    token: 'USDC',
    icon: USDCIcon,
    bgColor: '#2775ca',
    textColor: '#FFFFFF',
  },
];

/**
 * Coin generating function
 * @date 3/22/2023 - 3:25:11 PM
 *
 * @param {CoinProps} { bgColor, textColor, size = 'normal', shape = 'circle', token }
 * @returns {ReactElement}
 */
function Coin ({ bgColor, textColor, size = 'normal', shape = 'circle', token }: CoinProps): ReactElement {

  const coin = getCoin(token) || getCoin('DAC');
  const SizeClasses = getSizeClasses(size);
  const ShapeClasses = getShapeClasses(shape);

  function getCoin(token: string) {
    const value = token.toUpperCase();
    return coins.find((coin) => coin.token.toUpperCase() === value);
  }

  function getSizeClasses(size: string) {
    switch (size) {
      case 'medium':
        return 'w-10 h-10 sm:w-15 sm:h-15 text-xl p-1 sm:text-2xl sm:p-2';
      case 'normal':
        return 'w-10 h-10 text-xl p-1';
      case 'small':
        return 'w-4 h-4 text-md p-0.5';
      default:
        return 'w-9 h-9 text-lg p-4';
    }
  }

  function getShapeClasses(shape: string) {
    switch (shape) {
      case 'rounded':
        return 'rounded-xl';
      case 'squared':
        return 'rounded-none';
      default:
        return 'rounded-full'
    }
}

  return (
    <div
      className={`inline-flex items-center justify-items-center text-white uppercase leading-none md:mr-0 mr-2 ${SizeClasses} ${ShapeClasses}`}
      style={{ backgroundColor: bgColor || coin?.bgColor, color: textColor || coin?.textColor }}
    >
      {coin?.icon && <Image src={coin.icon} alt={coin.token} className="w-full h-auto max-h-full relative" />}
    </div>
  );


}

export default Coin;
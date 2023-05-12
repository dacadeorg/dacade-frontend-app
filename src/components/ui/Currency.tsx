import { formatCurrency } from "@coingecko/cryptoformat";
import { ReactElement, ReactNode, useMemo } from "react";

/**
 * Interface for currency props
 * @date 3/24/2023 - 6:26:46 PM
 *
 * @interface CurrencyProps
 * @typedef {CurrencyProps}
 */
interface CurrencyProps {
  value?: number;
  token?: string;
}

/**
 * Currency component
 * @date 3/24/2023 - 6:26:28 PM
 *
 * @export
 * @param {CurrencyProps} {
  value = 0,
  token = "",
}
 * @returns {ReactElement}
 */
export default function Currency({ value = 0, token = "" }: CurrencyProps): ReactElement {
  const currency = useMemo(() => {
    return formatCurrency(value, token, "en", true, {
      decimalPlaces: 2,
      significantFigures: 3,
    });
    
  }, [token, value]);
  console.log(`token ${token}`)
  return (
    <span>
      {currency} {token}
    </span>
  );
}

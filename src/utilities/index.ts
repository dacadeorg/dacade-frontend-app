/**
 * Provide duration in milimiter per second.
 * @date 2023-03-22
 * @param {number} ms
 * @returns {Promise<unknown>}
 */

export function sleep(ms: number): Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Convert a number to K ex : 7000 -> 7K, 2510 -> 2.5K
 * @date 12/7/2023 - 6:50:18 PM
 */
export const shorternNumber = (amount: number) => {
  const abbrevObject = [
    { value: 1000000000, abbreviation: "B" },
    { value: 1000000, abbreviation: "M" },
    { value: 1000, abbreviation: "K" },
  ];
  for (const { value, abbreviation } of abbrevObject) {
    if (amount >= value) {
      const product = amount / value;
      const isFloat = product % 1 !== 0;
      return `$${isFloat ? product.toFixed(1) : product}${abbreviation}`;
    }
  }
  return amount;
};

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
export const formatToK = (amount: number) => {
  const numberInK = amount / 1000;
  const isFloat = numberInK % 1 !== 0;
  return `$${isFloat ? numberInK.toFixed(1) : numberInK}K`;
};

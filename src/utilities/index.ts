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
 * Convert a number to K
 * @date 12/7/2023 - 6:50:18 PM
 */
export const convertToK = (amount: number) => {
  const kAmount = amount / 1000;
  return `$${kAmount % 1 === 0 ? kAmount : kAmount.toFixed(1)}K`;
};

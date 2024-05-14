/**
 * Provide duration in milimiter per second.
 * @date 2023-03-22
 * @param {number} ms
 * @returns {Promise<unknown>}
 */

export function sleep(ms: number): Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

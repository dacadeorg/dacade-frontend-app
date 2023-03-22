/**
 * Provide duration in milimiter per second.
 * @date 2023-03-22
 * @param {any} ms:number
 * @returns {any}
 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

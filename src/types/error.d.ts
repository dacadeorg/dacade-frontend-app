/**
 * Custom error interface that extends Error
 * @date 3/23/2023 - 10:25:20 AM
 *
 * @interface CustomError
 * @typedef {CustomError}
 * @extends {Error}
 */
export interface CustomError extends Error {
  details: { [key: string]: string };
}

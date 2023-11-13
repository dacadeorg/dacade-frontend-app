/**
 * Not found custom error
 * @date 11/8/2023 - 5:19:29 AM
 *
 * @export
 * @class NotFoundError
 * @typedef {NotFoundError}
 * @extends {Error}
 */
export class NotFoundError extends Error {
    constructor(message = "Not found!") {
      super(message);
      this.name = "NotFoundError";
    }
  }
  
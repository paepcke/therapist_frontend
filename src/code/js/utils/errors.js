/**
 * 
 */

export class NotImplementedError extends Error {
    constructor(...args) {
        super(...args);
        this.name = this.constructor.name;
    }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}
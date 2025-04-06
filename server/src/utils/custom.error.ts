export class CustomError extends Error {
    statusCode: number;
  
    constructor(message: string, statusCode = 500) {
      super(message);
      this.statusCode = statusCode;
  
      // Ensure correct prototype chain for `instanceof`
      Object.setPrototypeOf(this, CustomError.prototype);
    }
  }
  
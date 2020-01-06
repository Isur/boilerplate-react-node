/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "http";

export class HTTPError extends Error {
  code: number;
  message: string | undefined;

  constructor(code: number, message?: any) {
    const errorMessage = message || http.STATUS_CODES[code];
    super(errorMessage);
    this.code = code;
    this.message = errorMessage;
  }
}

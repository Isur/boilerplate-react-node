import { Request, Response } from "express";
import { Translate, langType } from "./src/client/locales/locales";
import { Send } from "express-serve-static-core";

declare global {
  interface ApiRequest extends Request {
    // session: any,
  }
  interface ApiResponse<T = any> extends Response {
    json: Send<T, this>
  }

  const lang: {
    dictionary: (path: string) => string;
    current: langType,
  }
  interface Window {
    lang: {
      dictionary: (path: string) => string;
      current: langType,
    }
  }
}

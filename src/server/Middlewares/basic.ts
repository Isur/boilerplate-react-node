import { NextFunction } from "express";
import { HTTPError } from "../Utils/HTTPError";
import { nullableStringsInObjects } from "../Utils/utils";

export const apiLogger = (req: ApiRequest, res: ApiResponse, next: NextFunction) => {
  // eslint-disable-next-line no-console
  console.log(`${req.method} - ${req.path}`);
  // eslint-disable-next-line no-console
  console.dir({ body: req.body }, { depth: null });
  next();
};

export const apiBadEndpoint = (req: ApiRequest, res: ApiResponse, next: NextFunction) => {
  next(new HTTPError(404, `No endpoint: ${req.method} ${req.path}`));
};

export const apiError = (error: HTTPError, req: ApiRequest, res: ApiResponse, next: NextFunction) => {
  console.error(error);
  res.status(error.code || 500).json({ code: error.code || 500, message: error.message });
};

export const apiNullEmptyString = (req: ApiRequest, res: ApiResponse, next: NextFunction) => {
  req.body = nullableStringsInObjects(req.body);
  next();
};

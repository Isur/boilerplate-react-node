import { NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";
import { HTTPError } from "../Utils/HTTPError";

export default (validations: ValidationChain[]) => {
  return async (req: ApiRequest, res: ApiResponse, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    let errorMessage = "";
    const errorsObject = errors.mapped();
    for(const err in errorsObject) {
      errorMessage += `${errorsObject[err].msg} for param {${errorsObject[err].param}} located in {${errorsObject[err].location}}. `;
    }
    if(errors.isEmpty()) {
      return next();
    }
    throw new HTTPError(400, errorMessage);
  };
};

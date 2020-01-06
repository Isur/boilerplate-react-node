import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../Configs/config";
import { findUser } from "../Components/users/userRepository";
import { HTTPError } from "../Utils/HTTPError";

export const auth = (onlyLoggedIn: boolean) => async (req: ApiRequest, res: ApiResponse, next: NextFunction) => {
  let token: string = undefined;
  if(req.cookies.jwt) {
    token = req.cookies.jwt;
  } else {
    token = req.get("auth-token");
  }
  try {
    const decoded = await tokenVerify(token);
    const user = await findUser("sessionid", decoded);
    req.session.userId = user.id;
    next();
  } catch(error) {
    if(onlyLoggedIn) throw new HTTPError(403, "Unauthorized");
    req.session.userId = null;
    next();
  }
};
/*eslint-disable */
export const tokenVerify = async (token: string): Promise<string> => {
  const decoded = jwt.verify(token, config.secrets.jwtSecret, (error, decoded) => {
    if(error) return undefined;
    return decoded;
  });
  if(decoded === undefined || Date.now() - (decoded as any).iat * 1000 > 1000 * 60 * 60 * 10) {
    return null;
  }
  return (decoded as any).sessionid;
};
/*eslint-enable */

import Router from "express-promise-router";
import { NextFunction } from "express";
import { body } from "express-validator";
import requestValidator from "../../Middlewares/requestValidator";
import { auth, tokenVerify } from "../../Middlewares/auth";
import { createUser, loginUser, getUser } from "./user";
import { destroySession, getUsers } from "./userRepository";
import { IMe } from "./userCommon";

export const router = Router();

router.get("/", auth(true), async (req: ApiRequest, res: ApiResponse) => {
  const users = await getUsers();
  res.json({ users: users });
});

router.post("/register", requestValidator([
  body("username").isString(),
  body("email").isEmail(),
  body("password").isString(),
  body("passwordConfirm").isString(),
]), async (req: ApiRequest, res: ApiResponse) => {
  const id = await createUser(req.body);
  res.json({ userId: id });
});

router.post("/login", requestValidator([
  body("username").isString(),
  body("password").isString(),
]), async (req: ApiRequest, res: ApiResponse<IMe>) => {
  const { user, token } = await loginUser(req.body);
  res.header({ "auth-token": token });
  res.cookie("jwt", token, {
    maxAge: 1000 * 60 * 60 * 10, // 10h
    httpOnly: true,
  });
  res.json({ id: user.id, email: user.email, username: user.username });
});

router.get("/logout", async (req: ApiRequest, res: ApiResponse, next: NextFunction) => {
  const sessionid = req.cookies.jwt
                    ? await tokenVerify(req.cookies.jwt)
                    : await tokenVerify(req.get("auth-token"));
  destroySession(sessionid);
  delete req.cookies.jwt;
  res.clearCookie("jwt");

  res.json({ response: "Logged out" });
});

router.get("/me", auth(true), async (req: ApiRequest, res: ApiResponse<IMe>) => {
  const { email, id, username } = await getUser("id", req.session.userId);
  res.json({ email, username, id });
});

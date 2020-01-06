import uuid from "uuid/v4";
import session from "express-session";
import config from "../Configs/config";

export default session({
  secret: config.secrets.sessionSecret,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 10,
  },
  genid: req => uuid(),
});

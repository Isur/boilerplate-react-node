/* eslint-disable no-console */
import path from "path";
import bodyParser from "body-parser";
import chalk from "chalk";
import express from "express";
import cookieParser from "cookie-parser";
import routes from "./API";
import "./Database/Postgres/db";
import { apiError } from "./Middlewares/basic";
import session from "./Utils/session";

const app = express();
const port = process.env.PORT || 5004;

app.use(session);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", routes);
app.use(apiError);
if(process.env.NODE_ENV === "production") {
  app.use("/public", express.static("build/public"));
  app.use("/client.bundle.js", express.static("build/client.bundle.js"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("build", "index.html"));
  });
}
app.listen(port, () => console.log(`${chalk.yellow.bold("Server started on port")} ${chalk.red.bold(`${port}`)}`));

export default app;

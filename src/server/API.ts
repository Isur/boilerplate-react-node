import express from "express";
import { apiLogger, apiBadEndpoint } from "./Middlewares/basic";
import { userAPI } from "./Components/users";

const router = express.Router();
router.use(apiLogger);
router.use("/users", userAPI);
router.use(apiBadEndpoint);

export default router;

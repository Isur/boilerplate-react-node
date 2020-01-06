import express from "express";

export const router = express.Router();

router.get("/", async (req: express.Request, res: express.Response) => {
  res.json({
    userList: [],
  });
});


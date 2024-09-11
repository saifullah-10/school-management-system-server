import express from "express";

export const test = async (req: express.Request, res: express.Response) => {
  return res.send("from course").end();
};

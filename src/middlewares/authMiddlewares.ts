import express from "express";
import { getUserByToken } from "../db/user";

import { get, merge } from "lodash";

export const isAuthenticate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const token = req.cookies["us-tk"];
    console.log(token);
    if (!token) {
      return res.status(400).json({ message: "Session expired" });
    }

    const user = await getUserByToken(token);
    if (!user) {
      return res.status(400).json({ message: "Session expired" });
    }
    merge(req, { identity: user });
    return next();
  } catch (err) {
    console.error(err);
  }
};

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const identity = get(req, "identity._id") as string;
    console.log(identity.toString(), id);
    if (!id || !identity.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (id !== identity.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    return next();
  } catch (err) {
    console.error(err);
  }
};

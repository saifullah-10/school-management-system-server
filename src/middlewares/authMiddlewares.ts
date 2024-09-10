import express, { NextFunction } from "express";
import { getUserByEmail, getUserByToken } from "../db/user";
import jwt from "jsonwebtoken";

import { get, merge } from "lodash";

import { Request } from "express";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const isAuthenticate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401).json({ message: "session expired" });
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    const user = await getUserByEmail(decoded.email);
    merge(req, { identity: user });
    next();
    // jwt.verify(
    //   token,
    //   process.env.JWT_SECRET,
    //   async (err: Error, decoded: any) => {
    //     if (err)
    //       return res.sendStatus(403).json({ message: "session invalid" });
    //     // req.user = decoded;
    //     const user = await getUserByEmail(decoded.email);
    //     merge(req, { identity: user });
    //     next();
    //   }
    // );
  } catch (err) {
    return res
      .clearCookie("token")
      .status(403)
      .json({ message: "session invalid" });
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

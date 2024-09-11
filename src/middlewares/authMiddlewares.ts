import express from "express";
import { getUserByEmail } from "../db/user";
import jwt from "jsonwebtoken";

import { get, merge } from "lodash";

export const isAuthenticate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "session expired" });
  }
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    const user = await getUserByEmail(decoded.email);
    merge(req, { identity: user });
    next();
  } catch (err) {
    return res
      .clearCookie("token", {
        domain: "school-management-system-client-delta.vercel.app",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        path: "/",
      })
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

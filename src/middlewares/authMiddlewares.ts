import express from "express";
import { getUserByEmail } from "../db/user";
import jwt from "jsonwebtoken";
import dotEnv from "dotenv";
import { get, merge } from "lodash";
import { User } from "authTypes";
dotEnv.config();
export const isAuthenticate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.header(
    "Access-Control-Allow-Origin",

    "https://starlight-un-edu.vercel.app"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  const authHeader = req.headers["authorization"];
  // const authHeader =
  //   "Beareer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRha2lAZ21haWwuY29tIiwiaWF0IjoxNzI2MTEwMDE3LCJleHAiOjE3MjYxMTM2MTd9.suTCIXXvYIFok0ijIAfaM-rAUaP_R1YHKzu9NcR8Y48";

  if (!authHeader) {
    return res.status(403).json({ message: "Forbidden" });
  }
  const token = authHeader.split(" ")[1];
  if (token === null) {
    return res.status(401);
  }
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    const user = await getUserByEmail(decoded.email);
    if (user) {
      merge(req, { identity: user });
      next();
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }
  } catch (err) {
    return res.status(403).json({ message: "Forbidden" });
  }
};

export const isAdmin = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const user: User = get(req, "identity");

  if (user) {
    if (user.role === "admin") {
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
};
export const isStudent = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const user: User = get(req, "identity");

  if (user) {
    if (user.role === "student") {
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
};
export const isTeacher = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const user: User = get(req, "identity");

  if (user) {
    if (user.role === "teacher") {
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
};

// export const isStudent = async (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) => {};

// export const isOwner = async (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) => {
//   try {
//     const { id } = req.params;
//     const identity = get(req, "identity._id") as string;

//     if (!id || !identity.toString()) {
//       return res.status(403).json({ message: "Unauthorized" });
//     }

//     if (id !== identity.toString()) {
//       return res.status(403).json({ message: "Unauthorized" });
//     }
//     return next();
//   } catch (err) {
//     console.error(err);
//   }
// };

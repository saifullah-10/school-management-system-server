// import express from "express";
// import { getUserByEmail } from "../db/user";
// import jwt from "jsonwebtoken";
// import dotEnv from "dotenv";
// import { get, merge } from "lodash";
// dotEnv.config();
// export const isAuthenticate = async (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) => {
//   const authHeader = req.headers["authorization"];
//   if (!authHeader) {
//     return res.status(403).json({ message: "Forbidden" });
//   }
//   const token = authHeader.split(" ")[1];
//   if (token === null) {
//     return res.status(401);
//   }
//   try {
//     const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await getUserByEmail(decoded.email);
//     merge(req, { identity: user });
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: "Forbidden" });
//   }
// };

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

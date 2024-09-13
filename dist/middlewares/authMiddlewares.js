"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTeacher = exports.isStudent = exports.isAdmin = exports.isAuthenticate = void 0;
const user_1 = require("../db/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const lodash_1 = require("lodash");
dotenv_1.default.config();
const isAuthenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.header("Access-Control-Allow-Origin", "https://starlight-un-edu.vercel.app");
    res.header("Access-Control-Allow-Credentials", "true");
    const authHeader = req.headers["authorization"];
    // const authHeader =
    //   "Beareer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRha2lAZ21haWwuY29tIiwiaWF0IjoxNzI2MTQ5NjMzLCJleHAiOjE3MjYxNTMyMzN9.PpM85QFeOb6TC76br02yjOIfoQ9EZsBcMFemVeng2do";
    if (!authHeader) {
        return res.status(403).json({ message: "Forbidden" });
    }
    const token = authHeader.split(" ")[1];
    if (token === null) {
        return res.status(401);
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = yield (0, user_1.getUserByEmail)(decoded.email);
        if (user) {
            (0, lodash_1.merge)(req, { identity: user });
            next();
        }
        else {
            return res.status(403).json({ message: "Forbidden" });
        }
    }
    catch (err) {
        return res.status(403).json({ message: "Forbidden" });
    }
});
exports.isAuthenticate = isAuthenticate;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (0, lodash_1.get)(req, "identity");
    if (user) {
        if (user.role === "admin") {
            next();
        }
        else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    }
    else {
        return res.status(403).json({ message: "Forbidden" });
    }
});
exports.isAdmin = isAdmin;
const isStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (0, lodash_1.get)(req, "identity");
    if (user) {
        if (user.role === "student") {
            next();
        }
        else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    }
    else {
        return res.status(403).json({ message: "Forbidden" });
    }
});
exports.isStudent = isStudent;
const isTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (0, lodash_1.get)(req, "identity");
    if (user) {
        if (user.role === "teacher") {
            next();
        }
        else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    }
    else {
        return res.status(403).json({ message: "Forbidden" });
    }
});
exports.isTeacher = isTeacher;
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
//# sourceMappingURL=authMiddlewares.js.map
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
exports.isAuthenticate = void 0;
const user_1 = require("../db/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const lodash_1 = require("lodash");
dotenv_1.default.config();
const isAuthenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers["authorization"];
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
        (0, lodash_1.merge)(req, { identity: user });
        next();
    }
    catch (err) {
        return res.status(403).json({ message: "Forbidden" });
    }
});
exports.isAuthenticate = isAuthenticate;
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
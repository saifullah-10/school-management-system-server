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
exports.isOwner = exports.isAuthenticate = void 0;
const user_1 = require("../db/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lodash_1 = require("lodash");
const isAuthenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (!token)
            return res.sendStatus(401).json({ message: "session expired" });
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                return res.sendStatus(403).json({ message: "session invalid" });
            // req.user = decoded;
            const user = yield (0, user_1.getUserByEmail)(decoded.email);
            (0, lodash_1.merge)(req, { identity: user });
            next();
        }));
    }
    catch (err) {
        console.error(err);
    }
});
exports.isAuthenticate = isAuthenticate;
const isOwner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const identity = (0, lodash_1.get)(req, "identity._id");
        if (!id || !identity.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        if (id !== identity.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        return next();
    }
    catch (err) {
        console.error(err);
    }
});
exports.isOwner = isOwner;
//# sourceMappingURL=authMiddlewares.js.map
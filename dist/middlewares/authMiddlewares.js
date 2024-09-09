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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOwner = exports.isAuthenticate = void 0;
const user_1 = require("../db/user");
const lodash_1 = require("lodash");
const isAuthenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies["us-tk"];
        console.log(token);
        if (!token) {
            return res.status(400).json({ message: "Session expired" });
        }
        const user = yield (0, user_1.getUserByToken)(token);
        if (!user) {
            return res.status(400).json({ message: "Session expired" });
        }
        (0, lodash_1.merge)(req, { identity: user });
        return next();
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
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
exports.registration = exports.login = void 0;
const user_1 = require("../db/user");
const hashPassword_1 = require("../helpers/hashPassword");
//login controller
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(403)
                .json({ message: "Email and Password are required" });
        }
        const user = yield (0, user_1.getUserByEmail)(email);
        if (!user) {
            return res.status(403).json({ message: "Invalid Email Or Password" });
        }
        const expectedHash = (0, hashPassword_1.authentication)(user.authentication.salt, password);
        const dbPass = user.authentication.password;
        if (expectedHash !== dbPass) {
            return res.status(400).json({ message: "Email Or Password Mismatch" });
        }
        const salt = (0, hashPassword_1.random)();
        const createToken = (0, hashPassword_1.authentication)(salt, user._id.toString());
        const updateToken = yield (0, user_1.updateSessionToken)(email, createToken);
        res.cookie("us-tk", user === null || user === void 0 ? void 0 : user.sessionToken, {
            domain: "localhost",
        });
        return res.status(200).json(updateToken).end();
    }
    catch (err) {
        console.error(err);
    }
});
exports.login = login;
//registration controller
const registration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.status(403).json({ message: "All Fields Are Require" });
        }
        //check already user exist in the dtabase
        const existingUser = yield (0, user_1.getUserByEmail)(email);
        //create a new user
        if (!existingUser) {
            const salt = (0, hashPassword_1.random)();
            const hashPass = (0, hashPassword_1.authentication)(salt, password);
            const user = yield (0, user_1.createUser)(email, hashPass, salt, username);
            if (user) {
                const getUser = yield (0, user_1.getUserByEmail)(email);
                const createSessionToken = (0, hashPassword_1.authentication)(salt, getUser === null || getUser === void 0 ? void 0 : getUser._id.toString());
                const updateToken = yield (0, user_1.updateSessionToken)(email, createSessionToken);
                const userForToken = yield (0, user_1.getUserByEmail)(email);
                res.cookie("us-tk", userForToken === null || userForToken === void 0 ? void 0 : userForToken.sessionToken, {
                    domain: "localhost",
                });
                return res.status(200).json(updateToken).end();
            }
            return res.status(200).json(user).end();
        }
        return res.status(400).json({ message: "User Already Exist" });
    }
    catch (err) {
        console.log(err);
    }
});
exports.registration = registration;
//# sourceMappingURL=authentication.js.map
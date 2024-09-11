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
exports.isUser = exports.logoutUser = exports.registration = exports.login = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user_1 = require("../db/user");
const hashPassword_1 = require("../helpers/hashPassword");
const lodash_1 = require("lodash");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//login controller
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log(email, password);
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
        const accessToken = jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: "10m",
        });
        const refreshToken = jsonwebtoken_1.default.sign({ email }, process.env.JWT_REFRESH_SECRET, {
            expiresIn: "10d",
        });
        const setInDb = yield (0, user_1.updateSessionToken)(email, refreshToken);
        if (setInDb.modifiedCount) {
            return res.status(200).json({ token: accessToken });
        }
        else {
            return res.status(403).json({ message: "forbidden" });
        }
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
                const uid = getUser === null || getUser === void 0 ? void 0 : getUser._id;
                const createSessionToken = (0, hashPassword_1.authentication)(salt, getUser === null || getUser === void 0 ? void 0 : getUser._id.toString(), uid);
                const updateToken = yield (0, user_1.updateSessionToken)(email, createSessionToken);
                if (updateToken) {
                    getUser.sessionToken = createSessionToken;
                    res.cookie("us-tk", getUser === null || getUser === void 0 ? void 0 : getUser.sessionToken, {
                        domain: "localhost",
                    });
                    return res.status(200).json(updateToken).end();
                }
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
//logout
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 0,
        });
        return res.status(200).json({ logout: true });
    }
    catch (err) {
        console.error(err);
    }
});
exports.logoutUser = logoutUser;
//isUser
const isUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (0, lodash_1.get)(req, "identity");
    if (user) {
        return res.status(200).json((0, lodash_1.merge)(user, { message: "from protected" }));
    }
});
exports.isUser = isUser;
//refresh token
// export const refreshToken = async () => {
//   try {
//     const user = getUserByToken();
//   } catch (err) {}
// };
//# sourceMappingURL=authentication.js.map
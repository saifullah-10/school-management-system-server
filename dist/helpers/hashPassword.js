"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = exports.random = void 0;
const crypto_1 = __importDefault(require("crypto"));
const SECRET = "SCH-MAN";
const random = () => crypto_1.default.randomBytes(128).toString("base64");
exports.random = random;
const authentication = (salt, password, uid) => {
    const generate = crypto_1.default
        .createHmac("sha256", [salt, password].join("/"))
        .update(SECRET)
        .digest("hex");
    if (uid) {
        const withUid = generate.slice(0, 10) + uid + generate.slice(10);
        return withUid;
    }
    return generate;
};
exports.authentication = authentication;
//# sourceMappingURL=hashPassword.js.map
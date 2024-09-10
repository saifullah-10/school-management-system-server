"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("../controllers/authentication");
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
exports.default = (router) => {
    router.post("/auth/register", authentication_1.registration);
    router.post("/auth/login", authentication_1.login);
    router.get("/auth/logout", authMiddlewares_1.isAuthenticate, authentication_1.logoutUser);
    router.get("/auth/protected", authMiddlewares_1.isAuthenticate, authentication_1.isUser);
};
//# sourceMappingURL=authRoute.js.map
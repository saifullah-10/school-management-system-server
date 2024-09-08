"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("../controllers/authentication");
exports.default = (router) => {
    router.post("/auth/register", authentication_1.registration);
    router.post("/auth/login", authentication_1.login);
    router.post("/auth/logout", authentication_1.logoutUser);
};
//# sourceMappingURL=authRoute.js.map
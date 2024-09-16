"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controllers/userController");
exports.default = (router) => {
    router.patch("/users/:userId/courses", userController_1.addCourseToUser);
    router.get("/users", userController_1.AllUser);
};
//# sourceMappingURL=userRoutes.js.map
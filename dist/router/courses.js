"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const courses_1 = require("../controllers/courses");
exports.default = (router) => {
    router.get("/courses/test", courses_1.test);
};
//# sourceMappingURL=courses.js.map
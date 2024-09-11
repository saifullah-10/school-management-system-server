"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const courses_1 = require("../controllers/courses");
exports.default = (router) => {
    router.get("/courses", courses_1.getCourses);
};
//# sourceMappingURL=courses.js.map
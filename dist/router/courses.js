"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const courses_1 = require("../controllers/courses");
exports.default = (router) => {
    router.get("/courses", courses_1.getCourses);
    router.post("/add-course", courses_1.postCorseData);
};
//# sourceMappingURL=courses.js.map
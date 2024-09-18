"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const teacher_1 = require("../controllers/teacher");
exports.default = (router) => {
    router.post("/add-teacher", teacher_1.addTeacher);
};
//# sourceMappingURL=teacherRoute.js.map
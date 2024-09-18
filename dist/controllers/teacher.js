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
exports.addTeacher = void 0;
const teacher_1 = require("../db/teacher");
const addTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, gender, dob, idNo, bloodGroup, religion, email, className, section, address, phone, bio, file } = req.body;
    if (!firstName || !lastName || !gender || !dob || !idNo || !bloodGroup || !religion || !email || !className || !section || !address || !phone || !bio || !file) {
        return res.status(400).json({ message: "All Fields Are Require" });
    }
    const data = { firstName, lastName, gender, dob, role: "teacher", idNo, bloodGroup, religion, email, className, section, address, phone, bio, file };
    try {
        const response = yield (0, teacher_1.postTeacher)(data);
        return res.status(200).json(response);
    }
    catch (err) {
        return res.status(404).json(Object.assign(Object.assign({}, err), { message: "teacher add failed" }));
    }
});
exports.addTeacher = addTeacher;
//# sourceMappingURL=teacher.js.map
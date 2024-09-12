"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoute_1 = __importDefault(require("./authRoute"));
const courses_1 = __importDefault(require("./courses"));
const attendanceRoute_1 = __importDefault(require("./attendanceRoute"));
const router = express_1.default.Router();
exports.default = () => {
    (0, authRoute_1.default)(router);
    (0, courses_1.default)(router);
    (0, attendanceRoute_1.default)(router);
    return router;
};
//# sourceMappingURL=index.js.map
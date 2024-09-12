"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attendanceController_1 = require("../controllers/attendanceController");
const router = (0, express_1.Router)();
// Define routes for attendance
router.get('/attendance', attendanceController_1.getAttendanceRecords);
router.get('/attendance/:name', attendanceController_1.getAttendanceRecordByName);
router.post('/attendance', attendanceController_1.addAttendanceRecord);
router.put('/attendance/:name', attendanceController_1.updateAttendanceRecord);
router.delete('/attendance/:name', attendanceController_1.deleteAttendanceRecord);
exports.default = (app) => {
    app.use('/api', router); // Mount the router with a base path
};
//# sourceMappingURL=attendanceRoute.js.map
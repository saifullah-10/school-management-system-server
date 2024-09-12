"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attendanceController_1 = require("../controllers/attendanceController");
exports.default = (router) => {
    router.get("/attendance", attendanceController_1.getAttendanceRecords);
    router.get("/attendance/:name", attendanceController_1.getAttendanceRecordByName);
    router.post("/attendance", attendanceController_1.addAttendanceRecord);
    router.put("/attendance/:name", attendanceController_1.updateAttendanceRecord);
    router.delete("/attendance/:name", attendanceController_1.deleteAttendanceRecord);
};
//# sourceMappingURL=attendanceRoute.js.map
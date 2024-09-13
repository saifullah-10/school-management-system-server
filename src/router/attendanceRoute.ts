import express from "express";
import {
  getAttendanceRecords,
  getAttendanceRecordByName,
  updateAttendanceRecord,
  deleteAttendanceRecord,
} from "../controllers/attendanceController";

export default (router: express.Router) => {
  router.get("/attendance", getAttendanceRecords);
  router.get("/attendance/:name", getAttendanceRecordByName);
  router.put("/attendance/:name", updateAttendanceRecord);
  router.delete("/attendance/:name", deleteAttendanceRecord);
};

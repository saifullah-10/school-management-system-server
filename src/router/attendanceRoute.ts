import express from "express";
import {
  getAttendanceRecords,
  getAttendanceRecordByName,
  addAttendanceRecord,
  updateAttendanceRecord,
  deleteAttendanceRecord,
} from "../controllers/attendanceController";

export default (router: express.Router) => {
  router.get("/attendance", getAttendanceRecords);
  router.get("/attendance/:name", getAttendanceRecordByName);
  router.post("/attendance", addAttendanceRecord);
  router.put("/attendance/:name", updateAttendanceRecord);
  router.delete("/attendance/:name", deleteAttendanceRecord);
};

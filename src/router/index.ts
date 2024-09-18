import express from "express";

import authRoute from "./authRoute";
import courses from "./courses";
import attendanceRoute from "./attendanceRoute";
import noticeRoute from "./noticeRoute";
import userRoutes from "./userRoutes";
import teacherRoute from "./teacherRoute";

const router = express.Router();

export default (): express.Router => {
  authRoute(router);
  courses(router);
  attendanceRoute(router);
  noticeRoute(router);
  userRoutes(router);
  teacherRoute(router)
  return router;
};

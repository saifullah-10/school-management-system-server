import express from "express";

import authRoute from "./authRoute";
import courses from "./courses";
import attendanceRoute from "./attendanceRoute";

const router = express.Router();

export default (): express.Router => {
  authRoute(router);
  courses(router);
  attendanceRoute(router);
  return router;
};

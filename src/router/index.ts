import express from "express";

import authRoute from "./authRoute";
import courses from "./courses";

const router = express.Router();

export default (): express.Router => {
  authRoute(router);
  courses(router);
  return router;
};

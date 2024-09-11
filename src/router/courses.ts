import express from "express";
import { getCourses } from "../controllers/courses";

export default (router: express.Router) => {
  router.get("/courses", getCourses);
};


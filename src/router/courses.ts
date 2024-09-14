import express from "express";
import { CourseByName, Courses, getCourses } from "../controllers/courses";

export default (router: express.Router) => {
  router.get("/courses", getCourses);
  router.get("/coursesCollection", Courses);
  router.get("/coursesCollection/:id", CourseByName);
};


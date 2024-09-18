import express from "express";
import { getCourses, postCorseData } from "../controllers/courses";

export default (router: express.Router) => {
  router.get("/courses", getCourses);
  router.post("/add-course", postCorseData)
};


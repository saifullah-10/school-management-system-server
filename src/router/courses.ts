import express from "express";
import { test } from "../controllers/courses";

export default (router: express.Router) => {
  router.get("/courses/test", test);
};

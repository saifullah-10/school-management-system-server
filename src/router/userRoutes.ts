import express from "express";
import { addCourseToUser, AllUser } from "../controllers/userController";

export default (router: express.Router) => {
    router.patch("/users/:userId/courses", addCourseToUser);
    router.get("/users",  AllUser);
};

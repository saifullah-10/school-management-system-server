import express from "express";
import { addCourseToUser, UserById } from "../controllers/userController";

export default (router: express.Router) => {
    router.patch("/users/:userId/courses", addCourseToUser);
    router.get("/users/:id",  UserById);
};

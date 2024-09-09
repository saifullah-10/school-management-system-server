import express from "express";
import { login, logoutUser, registration } from "../controllers/authentication";
import { isAuthenticate, isOwner } from "../middlewares/authMiddlewares";

export default (router: express.Router) => {
  router.post("/auth/register", registration);
  router.post("/auth/login", login);
  router.post("/auth/logout/:id", isAuthenticate, isOwner, logoutUser);
};

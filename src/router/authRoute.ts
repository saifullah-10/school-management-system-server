import express from "express";
import { registration } from "../controllers/authentication";

export default (router: express.Router) => {
  router.post("/auth/register", registration);
};

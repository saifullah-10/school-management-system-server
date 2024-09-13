import express from "express";
import {
  getNoticeDataCollection,
  postNoticeDataCollection,
} from "../controllers/notice";

export default (router: express.Router) => {
  router.post("/notice/send", postNoticeDataCollection);
  router.get("/notice", getNoticeDataCollection);
};

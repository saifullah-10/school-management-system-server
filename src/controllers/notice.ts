import express from "express";
import { getNoticeData, postNoticeData } from "../db/notice";

export const postNoticeDataCollection = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { title, content, posted, postedBy } = req.body;

    if (!title || !content || !posted || !postedBy) {
      return res.status(404).json({ message: "All field Are Require" });
    }
    const noticeData = { title, content, posted, postedBy };
    // return res.json(noticeData);
    const saveToDb = await postNoticeData(noticeData);

    if (saveToDb.acknowledged) {
      return res.status(200).json({ message: 1 }).end();
    }
  } catch (err) {
    return res.status(403).json({ message: "Forbidden" }).end();
  }
};
export const getNoticeDataCollection = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const getData = await getNoticeData();

    return res.status(200).json(getData);
  } catch (err) {
    return res.status(403).json({ message: "Forbidden" });
  }
};
// export const getNoticeData = async(req:express.Request,res:express.Response)=>{
//     try{}catch(err){
//         return res.status(403).json({message: "Forbidden"})
//     }
// }
// export const getNoticeData = async(req:express.Request,res:express.Response)=>{
//     try{}catch(err){
//         return res.status(403).json({message: "Forbidden"})
//     }
// }
// export const getNoticeData = async(req:express.Request,res:express.Response)=>{
//     try{}catch(err){
//         return res.status(403).json({message: "Forbidden"})
//     }
// }

import { NoticeData } from "noticeTypes";
import { connectToDatabase } from "./connectToDB";

export const postNoticeData = async (data: NoticeData) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("notice");
    const saveData = await collection.insertOne(data);
    return saveData;
  } catch (err) {
    return err;
  }
};
export const getNoticeData = async () => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("notice");
    const saveData = await collection.find().toArray();
    return saveData;
  } catch (err) {
    return err;
  }
};

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
export const getNoticeData = async (title?: string, posted?: string) => {
  try {
    console.log(title, posted);
    const query: any = {};
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }
    const date = new Date(posted);
    if (isNaN(date.getTime())) {
      console.log("Invalid date format:", posted);
    }

    if (typeof posted === "string" && posted) {
      const startDate = new Date(date.setUTCHours(0, 0, 0, 0));
      const endDate = new Date(date.setUTCHours(23, 59, 59, 999));

      query.posted = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    const db = await connectToDatabase();
    const collection = db.collection("notice");
    const saveData = await collection
      .find(query)
      .sort({ $natural: -1 })
      .toArray();

    return saveData;
  } catch (err) {
    return err;
  }
};

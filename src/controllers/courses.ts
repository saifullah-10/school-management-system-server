import express from "express";
import { connectToDatabase } from "../db/connectToDB";

export const test = async (req: express.Request, res: express.Response) => {
  return res.send("from course").end();
};

export const getCourses = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let db = await connectToDatabase();
    const collection = db.collection("coursesCollection");

    // Specify the fields to include in the result
    const courses = await collection
      .find(
        {},
        {
          projection: {
            _id: 1, // Include the _id field
            course_name: 1, // Include the course_name field
            category: 1, // Include the category field
            instructor: 1, // Include the instructor field
            credit_hours: 1, // Include the instructor field
            enrollment: 1, // Include the instructor field
            price: 1, // Include the price field
          },
        }
      )
      .toArray();

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve courses" });
    console.error(error);
  }
};

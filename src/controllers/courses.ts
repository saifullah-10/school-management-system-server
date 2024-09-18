
import express from "express";
import { connectToDatabase, getDB } from "../db/connectToDB";
import { ObjectId } from "mongodb";

import { postCourses } from "../db/courses";

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

export const Courses = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let db = getDB();
    const limit = parseInt(req.query.limit as string) || 0;

    const courses = await db.collection("coursesCollection").find().limit(limit).toArray();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve courses" });
    console.error(error);
  }
};

export const CourseByName = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let db = getDB();
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };

    const course = await db.collection("coursesCollection").findOne(query);
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve course' });
    console.error('Error fetching course:', error);
  }
};


//post course data

export const postCorseData = async(req:express.Request, res: express.Response)=>{


  const {course_code, title, author, category, overview, objectives, modules, prerequisites, duration, schedule, format, language, certification, course_image, course_name, description, lessons, credit_hours, enrollment, instructor, price} = req.body;

  if (!course_code || !title || !author || !category || 
    !overview || !objectives || !modules || !prerequisites || 
    !duration || !schedule || !format || !language || 
    !certification || !course_image || !course_name || !description || 
    !lessons || !credit_hours || !enrollment || !instructor || !price) {

      return res.status(400).json({message:"Validation failed: All fields are required."})
    
}

const data = {course_code, title, author, category, overview, objectives, modules, prerequisites, duration, schedule, format, language, certification, course_image, course_name, description, lessons: Number(lessons), credit_hours, enrollment: Number(enrollment), instructor, price: Number(price)}

try{

  const response = await postCourses(data)


  return res.status(200).json(response)


}catch(err){
  return res.status(400).json({message: "failed to posted data"})
}

  
}
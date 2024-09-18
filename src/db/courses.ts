import { CourseData } from "coursesType"
import { connectToDatabase } from "./connectToDB"

export const postCourses = async(coursesData: CourseData)=>{
    const db= await connectToDatabase()
    const coll = db.collection("coursesCollection")


    try{
const res = await coll.insertOne(coursesData);
return res


    }catch(err){
        return err
    }
}
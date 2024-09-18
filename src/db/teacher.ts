import { TeacherData } from "teacherTypes";
import { connectToDatabase } from "./connectToDB";

export const postTeacher = async(data: TeacherData)=>{

    const db = await connectToDatabase()
    const coll = db.collection("users")
try{

const res= await coll.insertOne(data)
return res

}catch(err){
    return err
}

}
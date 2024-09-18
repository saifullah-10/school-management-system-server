import express from 'express';
import { postTeacher } from '../db/teacher';
export const addTeacher = async (req:express.Request, res: express.Response) =>{

const {firstName, lastName, gender, dob, idNo, bloodGroup, religion, email, className, section, address, phone, bio, file} = req.body;

if (!firstName || !lastName || !gender || !dob || !idNo || !bloodGroup || !religion || !email || !className || !section || !address || !phone || !bio || !file) {
return res.status(400).json({message: "All Fields Are Require"})
  }

  const data = {firstName, lastName, gender, dob, role:"teacher", idNo, bloodGroup, religion, email, className, section, address, phone, bio, file}

try{

const response  = await postTeacher(data)

return res.status(200).json(response)

}catch(err){
    return res.status(404).json({...err, message: "teacher add failed"})
}


}
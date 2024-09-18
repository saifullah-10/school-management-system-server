import express  from 'express';
import { addTeacher } from '../controllers/teacher';
export default (router:express.Router) =>{

router.post("/add-teacher", addTeacher)

}
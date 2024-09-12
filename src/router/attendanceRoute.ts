import { Router } from 'express';
import {
  getAttendanceRecords,
  getAttendanceRecordByName,
  addAttendanceRecord,
  updateAttendanceRecord,
  deleteAttendanceRecord
} from '../controllers/attendanceController';

const router = Router();

// Define routes for attendance
router.get('/attendance', getAttendanceRecords);
router.get('/attendance/:name', getAttendanceRecordByName);
router.post('/attendance', addAttendanceRecord);
router.put('/attendance/:name', updateAttendanceRecord);
router.delete('/attendance/:name', deleteAttendanceRecord);

export default (app: Router) => {
  app.use('/api', router); // Mount the router with a base path
};

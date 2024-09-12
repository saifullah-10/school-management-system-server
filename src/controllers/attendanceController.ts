import { Request, Response } from 'express';
import { connectToDatabase, getDB } from '../db/connectToDB';

connectToDatabase();

// Fetch all attendance records
export const getAttendanceRecords = async (req: Request, res: Response) => {
    try {
      const db = getDB();
      const records = await db.collection('attendance').find().toArray();
      res.json(records);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

// Fetch a specific attendance record by student name
export const getAttendanceRecordByName = async (req: Request, res: Response) => {
  try {
    const db = await getDB();
    const name = req.params.name;
    const record = await db.collection('attendance').findOne({ name });
    if (record) {
      res.json(record);
    } else {
      res.status(404).json({ message: 'Record not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Add a new attendance record
export const addAttendanceRecord = async (req: Request, res: Response) => {
  try {
    const db = await getDB();
    const newRecord = req.body;
    const result = await db.collection('attendance').insertOne(newRecord);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update an existing attendance record by student name
export const updateAttendanceRecord = async (req: Request, res: Response) => {
  try {
    const db = await getDB();
    const name = req.params.name;
    const updatedData = req.body;
    const result = await db.collection('attendance').updateOne(
      { name },
      { $set: updatedData }
    );
    if (result.modifiedCount > 0) {
      res.json({ message: 'Record updated' });
    } else {
      res.status(404).json({ message: 'Record not found or no changes made' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete an attendance record by student name
export const deleteAttendanceRecord = async (req: Request, res: Response) => {
  try {
    const db = await getDB();
    const name = req.params.name;
    const result = await db.collection('attendance').deleteOne({ name });
    if (result.deletedCount > 0) {
      res.json({ message: 'Record deleted' });
    } else {
      res.status(404).json({ message: 'Record not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// // Fetch attendance records for a specific date
// export const getAttendanceRecordsByDate = async (req: Request, res: Response) => {
//     try {
//       const db = getDB();
//       const date = req.params.date; // Expect date in YYYY-MM-DD format
  
//       // Aggregation pipeline to filter records by date
//       const pipeline = [
//         {
//           $match: {
//             [`attendance.${date}`]: { $exists: true }
//           }
//         },
//         {
//           $project: {
//             name: 1,
//             attendance: {
//               [date]: `$attendance.${date}`
//             }
//           }
//         }
//       ];
  
//       const records = await db.collection('attendance').aggregate(pipeline).toArray();
//       res.json(records);
//     } catch (err) {
//       res.status(500).json({ message: 'Server error', error: err.message });
//     }
//   };

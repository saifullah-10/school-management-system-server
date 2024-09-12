"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAttendanceRecord = exports.updateAttendanceRecord = exports.addAttendanceRecord = exports.getAttendanceRecordByName = exports.getAttendanceRecords = void 0;
const connectToDB_1 = require("../db/connectToDB");
(0, connectToDB_1.connectToDatabase)();
// Fetch all attendance records
const getAttendanceRecords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = (0, connectToDB_1.getDB)();
        const records = yield db.collection('attendance').find().toArray();
        res.json(records);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});
exports.getAttendanceRecords = getAttendanceRecords;
// Fetch a specific attendance record by student name
const getAttendanceRecordByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, connectToDB_1.getDB)();
        const name = req.params.name;
        const record = yield db.collection('attendance').findOne({ name });
        if (record) {
            res.json(record);
        }
        else {
            res.status(404).json({ message: 'Record not found' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});
exports.getAttendanceRecordByName = getAttendanceRecordByName;
// Add a new attendance record
const addAttendanceRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, connectToDB_1.getDB)();
        const newRecord = req.body;
        const result = yield db.collection('attendance').insertOne(newRecord);
        res.status(201).json(result);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});
exports.addAttendanceRecord = addAttendanceRecord;
// Update an existing attendance record by student name
const updateAttendanceRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, connectToDB_1.getDB)();
        const name = req.params.name;
        const updatedData = req.body;
        const result = yield db.collection('attendance').updateOne({ name }, { $set: updatedData });
        if (result.modifiedCount > 0) {
            res.json({ message: 'Record updated' });
        }
        else {
            res.status(404).json({ message: 'Record not found or no changes made' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});
exports.updateAttendanceRecord = updateAttendanceRecord;
// Delete an attendance record by student name
const deleteAttendanceRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, connectToDB_1.getDB)();
        const name = req.params.name;
        const result = yield db.collection('attendance').deleteOne({ name });
        if (result.deletedCount > 0) {
            res.json({ message: 'Record deleted' });
        }
        else {
            res.status(404).json({ message: 'Record not found' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});
exports.deleteAttendanceRecord = deleteAttendanceRecord;
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
//# sourceMappingURL=attendanceController.js.map
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
exports.Courses = exports.getCourses = exports.test = void 0;
const connectToDB_1 = require("../db/connectToDB");
const test = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.send("from course").end();
});
exports.test = test;
const getCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let db = yield (0, connectToDB_1.connectToDatabase)();
        const collection = db.collection("coursesCollection");
        // Specify the fields to include in the result
        const courses = yield collection
            .find({}, {
            projection: {
                _id: 1, // Include the _id field
                course_name: 1, // Include the course_name field
                category: 1, // Include the category field
                instructor: 1, // Include the instructor field
                credit_hours: 1, // Include the instructor field
                enrollment: 1, // Include the instructor field
                price: 1, // Include the price field
            },
        })
            .toArray();
        res.status(200).json(courses);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve courses" });
        console.error(error);
    }
});
exports.getCourses = getCourses;
const Courses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let db = (0, connectToDB_1.getDB)();
        const limit = parseInt(req.query.limit) || 0;
        const courses = yield db.collection("coursesCollection").find().limit(limit).toArray();
        res.status(200).json(courses);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve courses" });
        console.error(error);
    }
});
exports.Courses = Courses;
//# sourceMappingURL=courses.js.map
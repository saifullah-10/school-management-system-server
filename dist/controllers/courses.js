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
exports.postCorseData = exports.CourseByName = exports.Courses = exports.getCourses = exports.test = void 0;
const connectToDB_1 = require("../db/connectToDB");
const mongodb_1 = require("mongodb");
const courses_1 = require("../db/courses");
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
const CourseByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let db = (0, connectToDB_1.getDB)();
        const id = req.params.id;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const course = yield db.collection("coursesCollection").findOne(query);
        res.status(200).json(course);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve course' });
        console.error('Error fetching course:', error);
    }
});
exports.CourseByName = CourseByName;
//post course data
const postCorseData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { course_code, title, author, category, overview, objectives, modules, prerequisites, duration, schedule, format, language, certification, course_image, course_name, description, lessons, credit_hours, enrollment, instructor, price } = req.body;
    if (!course_code || !title || !author || !category ||
        !overview || !objectives || !modules || !prerequisites ||
        !duration || !schedule || !format || !language ||
        !certification || !course_image || !course_name || !description ||
        !lessons || !credit_hours || !enrollment || !instructor || !price) {
        return res.status(400).json({ message: "Validation failed: All fields are required." });
    }
    const data = { course_code, title, author, category, overview, objectives, modules, prerequisites, duration, schedule, format, language, certification, course_image, course_name, description, lessons: Number(lessons), credit_hours, enrollment: Number(enrollment), instructor, price: Number(price) };
    try {
        const response = yield (0, courses_1.postCourses)(data);
        return res.status(200).json(response);
    }
    catch (err) {
        return res.status(400).json({ message: "failed to posted data" });
    }
});
exports.postCorseData = postCorseData;
//# sourceMappingURL=courses.js.map
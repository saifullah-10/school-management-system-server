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
exports.UserById = exports.addCourseToUser = void 0;
const mongodb_1 = require("mongodb");
const connectToDB_1 = require("../db/connectToDB");
const addCourseToUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('Received request to add course to user');
    const db = yield (0, connectToDB_1.connectToDatabase)();
    const users = db.collection("users");
    const { userId } = req.params;
    const { courseId } = req.body;
    // Validate userId and courseId
    if (!mongodb_1.ObjectId.isValid(userId) || !courseId) {
        // console.log('Invalid user ID or course ID');
        return res.status(400).json({ success: false, message: 'Invalid user ID or course ID' });
    }
    try {
        // Update the user's document to add the course ID to the registeredCourses array
        console.log('Attempting to update user document');
        const result = yield users.updateOne({ _id: new mongodb_1.ObjectId(userId) }, { $addToSet: { registeredCourses: courseId } } // Use $addToSet to avoid duplicates
        );
        console.log(`Update result: ${JSON.stringify(result)}`);
        // Check if any documents were modified
        if (result.modifiedCount === 0) {
            // console.log('User not found or course already registered');
            return res.status(404).json({ success: false, message: 'User not found or course already registered' });
        }
        // console.log('Course successfully added to user');
        return res.status(200).json({ success: true, message: 'Course successfully added to user' });
    }
    catch (error) {
        console.error('Error adding course to user:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
exports.addCourseToUser = addCourseToUser;
const UserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, connectToDB_1.connectToDatabase)();
    const users = db.collection("users");
    const id = req.params.id;
    const query = { _id: new mongodb_1.ObjectId(id) };
    const course = yield users.findOne(query);
    res.status(200).json(course);
});
exports.UserById = UserById;
//# sourceMappingURL=userController.js.map
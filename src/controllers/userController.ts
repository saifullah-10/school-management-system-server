import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../db/connectToDB';

export const addCourseToUser = async (req: Request, res: Response) => {
    // console.log('Received request to add course to user');

    const db = await connectToDatabase();
    const users = db.collection("users");

    const { userId } = req.params;
    const { courseId } = req.body;

    // Validate userId and courseId
    if (!ObjectId.isValid(userId) || !courseId) {
        // console.log('Invalid user ID or course ID');
        return res.status(400).json({ success: false, message: 'Invalid user ID or course ID' });
    }

    try {
        // Update the user's document to add the course ID to the registeredCourses array
        console.log('Attempting to update user document');
        const result = await users.updateOne(
            { _id: new ObjectId(userId) },
            { $addToSet: { registeredCourses: courseId } } // Use $addToSet to avoid duplicates
        );

        console.log(`Update result: ${JSON.stringify(result)}`);

        // Check if any documents were modified
        if (result.modifiedCount === 0) {
            // console.log('User not found or course already registered');
            return res.status(404).json({ success: false, message: 'User not found or course already registered' });
        }

        // console.log('Course successfully added to user');
        return res.status(200).json({ success: true, message: 'Course successfully added to user' });
    } catch (error) {
        console.error('Error adding course to user:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const UserById = async (req: Request, res: Response) => {
    const db = await connectToDatabase();
    const users = db.collection("users");
    const id = req.params.id;

    const query = { _id: new ObjectId(id) };

    const course = await users.findOne(query);
    res.status(200).json(course);
}

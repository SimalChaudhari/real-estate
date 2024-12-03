import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

// Define a custom type for the JWT payload if needed
interface JwtPayload {
    [key: string]: any; // Adjust this based on your actual JWT payload structure
    // For example, if your JWT payload has an `id` and `email` field, you can specify it as:
    // id: string;
    // email: string;
}
// Extend Express Request interface to include user property
declare module 'express-serve-static-core' {
    interface Request {
        user?: JwtPayload;
    }
}

interface DecodedToken {
    id: string;
}

export const authenticateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            res.status(401).json({ message: 'No token provided' });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

        if (!decoded || !decoded.id) {
            res.status(401).json({ message: 'Invalid token' });
            return;
        }

        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            res.status(401).json({ message: 'User not found' });
            return;
        }

        req.user = { id: user._id.toString() }; // Attach only the user ID or relevant fields
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
import { Request, Response, NextFunction } from 'express';
import User from '../models/user';

// Get all users
export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await User.find().select('-password'); // Exclude password
        res.status(200).json({ users });
    } catch (error) {
        next(error);
    }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await User.findById(req.params.id).select('-password'); // Exclude password
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
};

// Update user by ID
export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { firstName, lastName, email } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { firstName, lastName, email },
            { new: true, runValidators: true, select: '-password' } // Exclude password
        );

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({ user, message: 'User updated successfully' });
    } catch (error) {
        next(error);
    }
};

// Delete user by ID
export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};

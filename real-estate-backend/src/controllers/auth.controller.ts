import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';

// Register function
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ firstName, lastName, email, password: hashedPassword });
        await user.save();

        // Exclude the password from the response
        const { password: _, ...userWithoutPassword } = user.toObject();

        res.status(201).json({ user: userWithoutPassword, message: 'User registered successfully' });
    } catch (error) {
        next(error);
    }
};

// Login function
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'Invalid email or password' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: 'Invalid email or password' });
            return;
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });

        const { password: _, ...userWithoutPassword } = user.toObject();

        res.status(200).json({ user: userWithoutPassword, access_token: token });
    } catch (error) {
        next(error);
    }
};
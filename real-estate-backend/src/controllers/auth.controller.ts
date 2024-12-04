import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import crypto from 'crypto';
import { decrypt, encrypt } from '../utils/secret';

// Login Admin

export const loginAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

        if (user.role !== 'admin') {
            res.status(403).json({ message: 'Access restricted to admin users only' });
            return;
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });

        const { password: _, ...userWithoutPassword } = user.toObject();

        res.status(200).json({ user: userWithoutPassword, access_token: token });
    } catch (error) {
        next(error);
    }
};


// Register function
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { role, firstName, lastName, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ role, firstName, lastName, email, password: hashedPassword });
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

export const requestOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({ message: 'User with this email does not exist.' });
        return;
      }
  
      // Generate a 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const encryptedOtp = encrypt(otp);
  
      user.resetOtp = encryptedOtp;
      user.resetOtpExpires = new Date(Date.now() + 300000); // OTP valid for 5 minutes
      await user.save();
  
      // Send OTP to user (pseudo code)
      console.log(`Your OTP is: ${otp}`); // Replace with actual email/SMS sending logic
  
      res.status(200).json({ message: 'OTP has been sent to your email.' });
    } catch (error) {
      next(error);
    }
  };

  export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, otp, password, confirmPassword } = req.body;
  
    try {
      const user = await User.findOne({
        email,
        resetOtpExpires: { $gt: Date.now() }, // Check if OTP is still valid
      });
  
      if (!user) {
        res.status(400).json({ message: 'Invalid or expired OTP.' });
        return;
      }
  
      const decryptedOtp = decrypt(user.resetOtp!); // Decrypt the OTP
      if (decryptedOtp !== otp) {
        res.status(400).json({ message: 'Invalid OTP.' });
        return;
      }
  
      if (password !== confirmPassword) {
        res.status(400).json({ message: 'Passwords do not match.' });
        return;
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
  
      // Clear OTP fields
      user.resetOtp = undefined;
      user.resetOtpExpires = undefined;
      await user.save();
  
      res.status(200).json({ message: 'Password has been reset successfully.' });
    } catch (error) {
      next(error);
    }
  };
import { Request, Response, NextFunction } from 'express';
import State from '../../models/state';

// Create a State
export const createState = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;

    const newState = new State({ name });
    const savedState = await newState.save();

    res.status(201).json(savedState);
  } catch (error) {
    next(error);
  }
};

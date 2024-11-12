import { Request, Response } from 'express';
import Property from '../models/property';

// Get all properties
export const getProperties = async (req: Request, res: Response) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Add a new property
export const addProperty = async (req: Request, res: Response) => {
  const { title, description, address, city, state, price, area, propertyType } = req.body;
  const property = new Property({ title, description, address, city, state, price, area, propertyType });
  
  try {
    const newProperty = await property.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

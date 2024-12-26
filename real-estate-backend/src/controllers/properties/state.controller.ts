import mongoose, { Types } from 'mongoose';
import State from '../../models/state';
import City from '../../models/city';
import { Request, Response, NextFunction } from 'express';

export const createStateWithCities = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, cities } = req.body;

    if (!name || !Array.isArray(cities)) {
      res.status(400).json({ message: 'Invalid data. Provide a state name and an array of cities.' });
      return; // Ensure function exits after sending response
    }

    // Create the state
    const newState = new State({ name });
    const savedState = await newState.save();

    // Create cities
    const cityDocs = cities.map((cityName) => ({
      name: cityName,
      state: savedState._id,
    }));
    const savedCities = await City.insertMany(cityDocs);

    // Update state's cities field with ObjectId[]
    const cityIds: Types.ObjectId[] = savedCities.map((city) => city._id as Types.ObjectId); // Cast to ObjectId
    savedState.cities = cityIds;
    await savedState.save();

    res.status(201).json({
      message: 'State and cities created successfully',
      state: savedState,
      cities: savedCities,
    });
  } catch (error) {
    next(error);
  }
};


export const getStatesWithCities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const states = await State.find()
      .populate({ path: 'cities', select: 'name' }) // Populate cities field
      .select('name cities'); // Fetch state name and populated cities

    res.status(200).json(states);
  } catch (error) {
    next(error);
  }
};

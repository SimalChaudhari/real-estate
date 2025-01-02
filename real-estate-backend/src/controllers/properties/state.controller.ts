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

    // Validate state name and cities array
    if (!name || !Array.isArray(cities) || cities.length === 0) {
      res.status(400).json({ message: 'Invalid data. Provide a state name and a non-empty array of cities.' });
      return;
    }

    // Create the state
    const newState = new State({ name });
    const savedState = await newState.save();

    // Create cities with nested areas
    const cityDocs = cities.map((city) => ({
      name: city.name,
      areas: city.areas?.map((area: string) => ({ name: area })) || [], // Add area names with auto-generated IDs
     state: savedState._id,
    }));

    const savedCities = await City.insertMany(cityDocs);

    // Update state's cities field with ObjectId[] from saved cities
    const cityIds = savedCities.map((city) => city._id as Types.ObjectId); // Cast to ObjectId
    savedState.cities = cityIds;
    await savedState.save();

    res.status(201).json({
      message: 'State and cities with areas created successfully',
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
    .populate({
      path: 'cities',
      select: 'name areas', // Include city name and areas
      populate: {
        path: 'areas',
        select: '_id name', // Include area IDs and names
      },
    })
      .select('name cities'); // Fetch state name and populated cities

    res.status(200).json(states);
  } catch (error) {
    next(error);
  }
};


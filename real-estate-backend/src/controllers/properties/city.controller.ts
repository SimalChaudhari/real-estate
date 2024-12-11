import { Request, Response, NextFunction } from 'express';
import City from '../../models/city';

// export const createCity = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { name, stateId } = req.body;

//     const newCity = new City({ name, stateId });
//     const savedCity = await newCity.save();

//     res.status(201).json(savedCity);
//   } catch (error) {
//     next(error);
//   }
// };


// export const getCities = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const cityListings = await City.find()

//         res.status(200).json(cityListings);
//     } catch (error) {
//         next(error);
//     }
// };

export const createCity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cities = req.body.cities; // Expecting an array of cities in the request body

        if (!Array.isArray(cities)) {
            res.status(400).json({ message: 'Invalid data format. Expected an array of cities.' });
            return;
        }

        // Insert multiple cities into the database
        const savedCities = await City.insertMany(cities);

        res.status(201).json({ message: 'Cities created successfully', data: savedCities });
    } catch (error) {
        next(error);
    }
};

export const getCities = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cities = await City.find().select('name stateId'); // Fetch cities and include only required fields
        const citiesArray = cities.map(city => ({
            id: city._id,
            name: city.name,
            stateId: city.stateId,
        }));

        res.status(200).json({ cities: citiesArray });
    } catch (error) {
        next(error);
    }
};
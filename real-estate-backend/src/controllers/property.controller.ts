import { Request, Response, NextFunction } from 'express';
import Property from '../models/property';
import Address from '../models/address';
import Overview from '../models/overview';

export const createProperty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, price, property_type, status, listing_type, images, address, features, overview } = req.body;

    // Step 1: Create Address
    const newAddress = new Address(address);
    const savedAddress = await newAddress.save();

    // Step 2: Create Overview
    const newOverview = new Overview(overview);
    const savedOverview = await newOverview.save();

    // Step 3: Create Property and reference Address and Overview IDs
    const newProperty = new Property({
      title,
      description,
      price,
      address: savedAddress._id,
      overview: savedOverview._id,
      property_type,
      features,
      status,
      listing_type,
      listed_by: req.user?.id,
      images
    });

    const savedProperty = await newProperty.save();

    res.status(201).json(savedProperty);
  } catch (error) {
    next(error);
  }
};

export const getProperties = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const properties = await Property.find()
      .populate('address')
      .populate('overview')
      .populate('listed_by', 'firstName lastName email mobile');
    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
};

export const getPropertyById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('address')
      .populate('overview')
      .populate('listed_by', 'firstName lastName email mobile');
    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return
    }
    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
};

export const updateProperty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { address, overview, ...propertyData } = req.body;

    // Update Address if provided in the request body
    if (address) {
      const property = await Property.findById(req.params.id);
      if (property && property.address) {
        await Address.findByIdAndUpdate(property.address, address, { new: true, runValidators: true });
      }
    }

    // Update Overview if provided in the request body
    if (overview) {
      const property = await Property.findById(req.params.id);
      if (property && property.overview) {
        await Overview.findByIdAndUpdate(property.overview, overview, { new: true, runValidators: true });
      }
    }

    // Update Property details
    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, propertyData, {
      new: true,
      runValidators: true
    });

    if (!updatedProperty) {
      res.status(404).json({ message: 'Property not found' });
      return
    }


    res.status(200).json(updatedProperty);
  } catch (error) {
    next(error);
  }
};

export const deleteProperty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return
    }


    // Delete associated Address and Overview documents
    await Address.findByIdAndDelete(property.address);
    await Overview.findByIdAndDelete(property.overview);

    res.status(200).json({ message: 'Property and associated data deleted successfully' });
  } catch (error) {
    next(error);
  }
};

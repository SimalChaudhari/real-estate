import { Request, Response, NextFunction } from 'express';
import Listing from '../../models/properties';
import { deleteImage, uploadFile } from '../../services/firebase.service';
import city from '../../models/city';
import state from '../../models/state';

export const createListing = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { images, tags, features, ...listingData } = req.body;

        // Parse tags and features if they are received as strings
        const parsedTags = Array.isArray(tags) ? tags : tags.split(',').map((tag: string) => tag.trim());
        const parsedFeatures = Array.isArray(features) ? features : features.split(',').map((feature: string) => feature.trim());


        // Assert req.files is an array of files
        const files = req.files as Express.Multer.File[];

        const uploadedImages: string[] = [];

        // Upload images sequentially to Firebase
        for (const file of files) {
            const filePath = `listings/${Date.now()}_${file.originalname}`;
            const uploadedImage = await uploadFile(filePath, file.buffer);
            uploadedImages.push(uploadedImage);
        }

        // Create a new listing with uploaded image URLs
        const newListing = new Listing({
            ...listingData,
            images: uploadedImages, // Use the uploaded image URLs
            tags: parsedTags, // Use the uploaded image URLs
            features: parsedFeatures, // Use the uploaded image URLs

        });

        const savedListing = await newListing.save();

        res.status(201).json(savedListing);
    } catch (error) {
        next(error);
    }
};


export const updateListing = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { tags, features, images, ...updateData } = req.body;

        // Find the existing listing
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            res.status(404).json({ message: 'Listing not found' });
            return;
        }

        let uploadedImages: string[] = listing.images; // Default to existing images
        const imageErrors: string[] = [];

        // Handle image uploads only if new images are provided
        if (req.files && Array.isArray(req.files) && req.files.length > 0) {
            try {
                const newImages: string[] = [];
                // Upload new images
                for (const file of req.files as Express.Multer.File[]) {
                    const filePath = `listings/${Date.now()}_${file.originalname}`;
                    const uploadedImage = await uploadFile(filePath, file.buffer);
                    newImages.push(uploadedImage);
                }

                // Delete old images if new images were successfully uploaded
                for (const url of listing.images) {
                    try {
                        await deleteImage(url);
                    } catch (error: any) {
                        imageErrors.push(`Failed to delete image: ${url}. Error: ${error.message || 'Unknown error'}`);
                    }
                }

                uploadedImages = newImages; // Replace with new images
            } catch (uploadError: any) {
                res.status(500).json({
                    message: 'Error occurred while uploading or deleting images',
                    error: uploadError.message,
                });
                return;
            }
        }

        // Parse tags and features if they are strings
        const parsedTags = tags ? (Array.isArray(tags) ? tags : tags.split(',').map((tag: string) => tag.trim())) : listing.tags;
        const parsedFeatures = features
            ? (Array.isArray(features) ? features : features.split(',').map((feature: string) => feature.trim()))
            : listing.features;

        // Update the listing in the database
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            {
                ...updateData,
                tags: parsedTags,
                features: parsedFeatures,
                images: uploadedImages, // Updated images
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: 'Listing updated successfully',
            data: updatedListing,
            ...(imageErrors.length > 0 && { imageErrors }),
        });
    } catch (error) {
        next(error); // Pass any unhandled errors to Express error handler
    }
};


export const deleteListing = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            res.status(404).json({ message: 'Listing not found' });
            return;
        }
        const imageErrors: string[] = [];

        // Delete associated images one by one
        for (const url of listing.images) {
            try {
                await deleteImage(url); // Attempt to delete each image
            } catch (error: any) {
                imageErrors.push(`Failed to delete image: ${url}. Error: ${error.message || 'Unknown error'}`);
            }
        }

        // Delete the listing
        await listing.deleteOne();

        // Respond with success, including any image deletion errors
        if (imageErrors.length > 0) {
            res.status(200).json({
                message: 'Listing deleted successfully with some image deletion errors',
                imageErrors,
            });
        } else {
            res.status(200).json({ message: 'Listing and associated images deleted successfully' });
        }
    } catch (error) {
        next(error);
    }
};

export const getListings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const listings = await Listing.find()
            .populate({
                path: 'city',
                select: 'name -_id',
            })
            .populate({
                path: 'location',
                select: 'name -_id',
            });

        // Transform the data to flatten `city` and `location` fields
        const transformedListings = listings.map((listing) => {
            const listingObj = listing.toObject();
            return {
                ...listingObj,
                city: typeof listingObj.city === 'object' && 'name' in listingObj.city ? listingObj.city.name : null,
                location: typeof listingObj.location === 'object' && 'name' in listingObj.location ? listingObj.location.name : null,
            };
        });

        res.status(200).json(transformedListings);
    } catch (error) {
        next(error);
    }
};

export const getListingById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const listing = await Listing.findById(req.params.id)
            .populate({
                path: 'city',
                select: 'name -_id', // Include `name` and exclude `_id`
            })
            .populate({
                path: 'location',
                select: 'name -_id', // Include `name` and exclude `_id`
            });

        if (!listing) {
            res.status(404).json({ message: 'Listing not found' });
            return;
        }

        // Transform the response to flatten city and location
        const listingObj = listing.toObject();
        const transformedListing = {
            ...listingObj,
            city: typeof listingObj.city === 'object' && 'name' in listingObj.city ? listingObj.city.name : null,
            location: typeof listingObj.location === 'object' && 'name' in listingObj.location ? listingObj.location.name : null,
        };

        res.status(200).json(transformedListing);
    } catch (error) {
        next(error);
    }
};


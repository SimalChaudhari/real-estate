import { Request, Response, NextFunction } from 'express';
import Listing from '../models/properties';
import { deleteImage, uploadFile } from '../services/firebase.service';

export const createListing = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { images, ...listingData } = req.body;
        // Assert req.files is an array of files
        const files = req.files as Express.Multer.File[];
        // Upload images to Firebase
        const uploadedImages = await Promise.all(
            files.map(async (file) => {
                const filePath = `listings/${Date.now()}_${file.originalname}`;
                return await uploadFile(filePath, file.buffer);
            })
        );
        // Create a new listing with uploaded image URLs
        const newListing = new Listing({
            ...listingData,
            images: uploadedImages, // Use the uploaded image URLs
        });
        const savedListing = await newListing.save();
        res.status(201).json(savedListing);
    } catch (error) {
        next(error);
    }
};

export const updateListing = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { images, ...updateData } = req.body;

        // Find the existing listing
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            res.status(404).json({ message: 'Listing not found' });
            return;
        }

        let uploadedImages: string[] = [];
        const imageErrors: string[] = [];

        // Handle image uploads and deletions only if new images are provided
        if (req.files && Array.isArray(req.files) && req.files.length > 0) {
            try {
                // Upload new images
                for (const file of req.files as Express.Multer.File[]) {
                    const filePath = `listings/${Date.now()}_${file.originalname}`;
                    const uploadedImage = await uploadFile(filePath, file.buffer);
                    uploadedImages.push(uploadedImage);
                }

                // Delete old images if new images are uploaded
                if (listing.images && listing.images.length > 0) {
                    for (const url of listing.images) {
                        try {
                            await deleteImage(url);
                        } catch (error: any) {
                            imageErrors.push(`Failed to delete image: ${url}. Error: ${error.message || 'Unknown error'}`);
                        }
                    }
                }
            } catch (uploadError: any) {
                res.status(500).json({
                    message: 'Error occurred while uploading or deleting images',
                    error: uploadError.message,
                });
                return;
            }
        }

        // Update the listing in the database
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            {
                ...updateData,
                ...(uploadedImages.length > 0 && { images: uploadedImages }), // Only update images if new ones are uploaded
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
        const listings = await Listing.find();
        res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
};

export const getListingById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            res.status(404).json({ message: 'Listing not found' });
            return;
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};

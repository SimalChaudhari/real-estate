import mongoose, { Schema, Document, Types } from 'mongoose';

// Define a feature type
interface IFeature {
    name: string;
    value: string | number | boolean;
}

// Property Status Enum
export enum Status {
    AVAILABLE = "Available",
    SOLD = "Sold",
    PENDING = "Pending"
}

// Listing Type Enum
export enum ListingType {
    BUY = "Buy",
    RENT = "Rent",
    PLOTS = "Plots"
}

// Property Type Enum
export enum PropertyType {
    APARTMENT = "Apartment",
    VILLA = "Villa",
    OFFICE = "Office",
    HOUSE = "House",
    COMMERCIAL = "Commercial",
    LAND = "Land",
    STUDIO = "Studio",
    WAREHOUSE = "Warehouse"
}

// Property Interface
export interface IProperty extends Document {
    title: string;
    description: string;
    address: Types.ObjectId; // Reference to Address
    overview: Types.ObjectId; // Reference to Overview
    price: number;
    property_type: PropertyType;
    status: Status;
    listed_by: Types.ObjectId;
    listing_type: ListingType; // Enum type
    images: string[];
    features: IFeature[]; // Array of features
    created_at: Date;
    updated_at: Date;
}

const PropertySchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true }, // Reference
    overview: { type: mongoose.Schema.Types.ObjectId, ref: 'Overview', required: true }, // Reference
    property_type: {
        type: String,
        enum: Object.values(PropertyType),
        required: true
    },
    status: {
        type: String,
        enum: Object.values(Status),
        default: Status.AVAILABLE
    },
    listing_type: {
        type: String,
        enum: Object.values(ListingType),
        required: true
    },
    listed_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    images: [{ type: String }],
    features: [
        {
            name: { type: String, required: true },
            value: { type: Schema.Types.Mixed, required: true }
        }
    ],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export default mongoose.model<IProperty>('Property', PropertySchema);

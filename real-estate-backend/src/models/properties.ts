import mongoose, { Schema, Document } from 'mongoose';

// Enum for Features
export enum Features {
  AIR_CONDITIONING = "Air Conditioning",
  LAWN = "Lawn",
  TV_CABLE = "TV Cable",
  DRYER = "Dryer",
  OUTDOOR_SHOWER = "Outdoor Shower",
  WASHER = "Washer",
  LAKE_VIEW = "Lake view",
  WINE_CELLAR = "Wine cellar",
  FRONT_YARD = "Front yard",
  REFRIGERATOR = "Refrigerator",
  ATTIC = "Attic",
  BASKETBALL_COURT = "Basketball court",
}

// Enum for Tags
export enum Tags {
  HOUSE = "house",
  VILLA = "villa",
  APARTMENTS = "apartments",
  OFFICE = "office",
}

// Enum for Property Types
export enum PropertyType {
  HOUSES = "Houses",
  VILLA = "Villa",
  APARTMENTS = "Apartments",
  OFFICE = "Office",
}

// Define an interface for the property data
export interface IListing extends Document {
  images: string[];
  title: string;
  city: mongoose.Types.ObjectId; // Reference to City
  location: mongoose.Types.ObjectId; // Reference to State
  address: string;
  description: string;
  bed: string;
  bath: string;
  sqft: number;
  price: string;
  forRent: boolean;
  tags: Tags[];
  propertyType: PropertyType;
  yearBuilding: number;
  featured: boolean;
  lat: number;
  long: number;
  features: Features[];
}

// Define the Mongoose schema
const ListingSchema: Schema = new Schema({
  images: [{ type: String }],
  title: { type: String, required: true },
  city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true },
  address: { type: String, required: true },
  description: { type: String},
  bed: { type: String, required: true },
  bath: { type: String, required: true },
  sqft: { type: Number, required: true },
  price: { type: String, required: true },
  forRent: { type: Boolean, required: true },
  tags: {
    type: [String],
    enum: Object.values(Tags), // Enum for tags
    required: true,
  },
  propertyType: {
    type: String,
    enum: Object.values(PropertyType), // Enum for property types
    required: true,
  },
  yearBuilding: { type: Number, required: true },
  featured: { type: Boolean, default: false },
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
  features: {
    type: [String],
    enum: Object.values(Features), // Enum for features
    required: true,
  },
});

// Export the model
export default mongoose.model<IListing>('Listing', ListingSchema);

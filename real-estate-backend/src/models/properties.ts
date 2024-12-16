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


// Property Status Enum
export enum Status {
  AVAILABLE = "Available",
  SOLD = "Sold",
  PENDING = "Pending"
}


// Define an interface for the property data
export interface IListing extends Document {
  //description
  title: string;
  description: string;
  status: string;
  rent_price: string;
  sale_price: string;
  images: string[];

  //address
  // city: mongoose.Types.ObjectId; // Reference to City
  // location: mongoose.Types.ObjectId; // Reference to State
  street_address: string;
  city: mongoose.Types.ObjectId | { name: string }; // Include the populated type
  state: mongoose.Types.ObjectId | { name: string }; // Include the populated type
  zip_code: string;

  lat: number;
  long: number;

  //listing
  bed: string;
  bath: string;
  sqft: number;
  forRent: boolean;
  start_date:Date;
  tags: Tags[];
  propertyType: PropertyType;
  yearBuilding: number;
  featured: boolean;
  features: Features[];
}

// Define the Mongoose schema
const ListingSchema: Schema = new Schema({
  // description
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: Object.values(Status), default: Status.AVAILABLE },// new
  rent_price: { type: String, required: true },
  sale_price: { type: String, required: true },

  images: [{ type: String }],
  // address
  street_address: { type: String, required: true },
  city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
  state: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true },
  zip_code: { type: String, required: true },
  lat: { type: Number, required: true },
  long: { type: Number, required: true },

  // listing Details
  bed: { type: String, required: true },
  bath: { type: String, required: true },
  sqft: { type: Number, required: true },
  forRent: { type: Boolean, required: true },
  start_date: { type: Date, required: true },

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

  features: {
    type: [String],
    enum: Object.values(Features), // Enum for features
    required: true,
  },
});

// Export the model
export default mongoose.model<IListing>('Listing', ListingSchema);

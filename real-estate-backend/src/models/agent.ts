import mongoose, { Schema, Document } from 'mongoose';

// Enum for Categories
export enum Category {
  OFFICE = "Office",
  APARTMENTS = "Apartments",
  HOUSES = "Houses",
  VILLA = "Villa",
}

// Define the Agent Interface
export interface IAgent extends Document {
  city: string;
  category: Category;
  name: string;
  imgSrc: string;
  propertiesCount: string;
  starRating: number;
  agencyTitle: string;
  address: string;
}

// Define the Agent Schema
const AgentSchema: Schema = new Schema({
  city: { type: String, required: true },
  category: {
    type: String,
    enum: Object.values(Category),
    required: true,
  },
  name: { type: String, required: true },
  imgSrc: { type: String },
  propertiesCount: { type: String },
  starRating: { type: Number, min: 0, max: 5 },
  agencyTitle: { type: String },
  address: { type: String },
});

// Export the Agent Model
export default mongoose.model<IAgent>('Agent', AgentSchema);

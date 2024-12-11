import mongoose, { Schema, Document } from 'mongoose';

// Interface for City
export interface ICity extends Document {
  name: string;
  stateId: mongoose.Types.ObjectId; // Reference to State
}

// City Schema
const CitySchema: Schema = new Schema({
  name: { type: String, required: true },
  stateId: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true },
});

// Export City Model
export default mongoose.model<ICity>('City', CitySchema);

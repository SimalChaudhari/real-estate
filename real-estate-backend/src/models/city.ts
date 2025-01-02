import mongoose, { Schema, Document } from 'mongoose';

export interface ICity extends Document {
  name: string;
  state: mongoose.Types.ObjectId; // Reference to the State
}

const CitySchema: Schema = new Schema({
  name: { type: String, required: true },
  areas: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Auto-generated unique ID for each area
      name: { type: String, required: true }, // Name of the area
    },
  ],
  state: { type: Schema.Types.ObjectId, ref: 'State', required: true },
});

export default mongoose.model<ICity>('City', CitySchema);

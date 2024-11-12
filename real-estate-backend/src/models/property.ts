import mongoose, { Schema, Document } from 'mongoose';

interface IProperty extends Document {
  title: string;
  description: string;
  address: string;
  city: string;
  state: string;
  price: number;
  area: number;
  propertyType: string;
  status: string;
}

const PropertySchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  price: { type: Number, required: true },
  area: { type: Number, required: true },
  propertyType: { type: String, required: true },
  status: { type: String, default: 'Available' },
});

export default mongoose.model<IProperty>('Property', PropertySchema);

import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IState extends Document {
  name: string;
  cities: Types.ObjectId[]; // Explicitly specify ObjectId[]
}

const StateSchema: Schema = new Schema({
  name: { type: String, required: true },
  cities: [{ type: Schema.Types.ObjectId, ref: 'City' }], // Cities reference
});

export default mongoose.model<IState>('State', StateSchema);

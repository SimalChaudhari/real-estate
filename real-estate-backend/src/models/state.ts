import mongoose, { Schema, Document } from 'mongoose';

// Interface for State
export interface IState extends Document {
  name: string;
}

// State Schema
const StateSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
});

// Export State Model
export default mongoose.model<IState>('State', StateSchema);

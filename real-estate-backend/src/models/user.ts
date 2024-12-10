import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  _id: string; // Explicitly define the type of `_id`
  firstName: string;
  lastName: string;
  email: string;
  mobile: number;
  gender: 'Male' | 'Female';
  status: 'Active' | 'Suspended';
  password: string;
  role: 'Admin' | 'Customer'; // Define role with specific allowed values
  resetOtp?: string;
  resetOtpExpires?: Date;
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: Number, required: true, unique: true },
  gender: { type: String, required: true, enum: ['Male', 'Female'] },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['Admin', 'Customer'], // Allowed values for role
    default: 'Customer', // Default role is customer
    required: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Suspended'], // Allowed values for role
    default: 'Active', // Default role is customer
    required: true,
  },

  resetOtp: { type: String },
  resetOtpExpires: { type: Date },
});

export default mongoose.model<IUser>('User', UserSchema);

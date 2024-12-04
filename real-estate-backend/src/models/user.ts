import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  _id: string; // Explicitly define the type of `_id`
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'admin' | 'customer'; // Define role with specific allowed values
  resetOtp?: string;
  resetOtpExpires?: Date;
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'customer'], // Allowed values for role
    default: 'customer', // Default role is customer
    required: true,
  },

  resetOtp: { type: String },
  resetOtpExpires: { type: Date },
});

export default mongoose.model<IUser>('User', UserSchema);

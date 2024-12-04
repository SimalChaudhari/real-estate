import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  _id: string; // Explicitly define the type of `_id`
  firstName: string;
  lastName: string;
  email: string;
  password: string
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export default mongoose.model<IUser>('User', UserSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface IAddress extends Document {
    address: string;
    city: string;
    state: string;
    zip_code: string;
    latitude?: number;
    longitude?: number;

    
}

const AddressSchema: Schema = new Schema({
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip_code: { type: String, required: true },
    latitude: { type: Number },
    longitude: { type: Number }
});

export default mongoose.model<IAddress>('Address', AddressSchema);

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

});

export default mongoose.model<IAddress>('Address', AddressSchema);

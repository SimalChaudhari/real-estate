import mongoose, { Schema, Document } from 'mongoose';

// Configuration Type Enum
export enum ConfigurationType {
    ONE_BHK = "1 BHK",
    TWO_BHK = "2 BHK",
    THREE_BHK = "3 BHK",
    FOUR_BHK = "4 BHK",
    FIVE_BHK = "5 BHK"
}

// Property Type Enum
export enum PropertyType {
    APARTMENT = "Apartment",
    VILLA = "Villa",
    OFFICE = "Office",
    HOUSE = "House",
    COMMERCIAL = "Commercial",
    LAND = "Land",
    STUDIO = "Studio",
    WAREHOUSE = "Warehouse"
}
// Listing Type Enum
export enum ListingType {
    BUY = "Buy",
    RENT = "Rent",
    PLOTS = "Plots"
}



export interface IOverview extends Document {
    project_area: number; // e.g., 3.5 acres.
    size_range: { min: number; max: number }; // (e.g., from 1500 to 2000 square feet).
    launch_date: Date;
    property_size: ConfigurationType; // e.g., 3BHK
    property_type: PropertyType;
    listing_type: ListingType; // Enum type
}

const OverviewSchema: Schema = new Schema({
    project_area: { type: Number, required: true },
    size_range: { type: Number, required: true },
    launch_date: { type: Date, required: true },
    property_type: {
        type: String,
        enum: Object.values(PropertyType),
        required: true
    },
    property_size: {
        type: String,
        enum: Object.values(ConfigurationType),
        required: true
    },

    listing_type: {
        type: String,
        enum: Object.values(ListingType),
        required: true
    },
});

export default mongoose.model<IOverview>('Overview', OverviewSchema);

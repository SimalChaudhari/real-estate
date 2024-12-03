import mongoose, { Schema, Document } from 'mongoose';


// Configuration Type Enum
export enum ConfigurationType {
    ONE_BHK = "1 BHK",
    TWO_BHK = "2 BHK",
    THREE_BHK = "3 BHK",
    FOUR_BHK = "4 BHK",
    FIVE_BHK = "5 BHK"
}

export interface IOverview extends Document {
    project_area: number;
    size_range: { min: number; max: number };
    project_size: { buildings: number; units: number };
    launch_date: Date;
    avg_price: string;
    possession_starts: Date;
    configuration: ConfigurationType;
}

const OverviewSchema: Schema = new Schema({
    project_area: { type: Number, required: true },
    size_range: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    project_size: {
        buildings: { type: Number, required: true },
        units: { type: Number, required: true }
    },
    launch_date: { type: Date, required: true },
    avg_price: { type: String, default: "Price on request" },
    possession_starts: { type: Date, required: true },
    configuration: {
        type: String,
        enum: Object.values(ConfigurationType),
        required: true
    },
});

export default mongoose.model<IOverview>('Overview', OverviewSchema);

import mongoose, { Schema, Document } from "mongoose";

export interface IApplication extends Document {
  _id: mongoose.Types.ObjectId;
  date: Date;
}

const ApplicationSchema: Schema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
  date: { type: Date, required: true, default: new Date() },
});

export default mongoose.model<IApplication>("Application", ApplicationSchema);

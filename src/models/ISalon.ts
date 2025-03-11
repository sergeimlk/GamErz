import mongoose, { Schema, Document } from "mongoose";

export interface ISalon extends Document {
  _id: mongoose.Types.ObjectId;
  name: String;
}

const SalonSchema: Schema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
  name: { type: String, required: true },
});

export default mongoose.model<ISalon>("Salon", SalonSchema);

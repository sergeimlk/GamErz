import mongoose, { Schema, Document } from "mongoose";

export interface ISalon extends Document {
  _id: {
    type: mongoose.Types.ObjectId;
    index: true;
    required: true;
    auto: true;
  };
  salon_name: {
    type: String;
    index: true;
    required: true;
    auto: true;
  };
}

const SalonSchema: Schema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
  salon_name: { type: String, index: true, required: true, auto: true },
});

export const Salon;

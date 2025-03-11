import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  _id: mongoose.Types.ObjectId;
  date: Date;
  message: string;
}

const MessageSchema: Schema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
  date: { type: Date, required: true, default: () => new Date() },
  message: { type: String, required: true },
});

export default mongoose.model<IMessage>("Message", MessageSchema);

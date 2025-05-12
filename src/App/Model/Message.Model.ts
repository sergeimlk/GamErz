import { z } from "zod";
import mongoose, { Schema } from "mongoose";

const messageMongooseSchema = new Schema({
  saloonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Saloon', required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

const objectIdSchema = z.string()
  .regex(/^[0-9a-fA-F]{24}$/, 'Invalid Mongo ObjectId')
  .transform((value) => new mongoose.Types.ObjectId(value));

export const messageSchema = z.object({
  saloonId: objectIdSchema,
  senderId: objectIdSchema,
  content: z.string().min(1, 'Message content is required')
});

export type MessageDTO = z.infer<typeof messageSchema> & { _id: mongoose.Types.ObjectId};
const MessageModel = mongoose.model<MessageDTO>("Message", messageMongooseSchema);
export default MessageModel;
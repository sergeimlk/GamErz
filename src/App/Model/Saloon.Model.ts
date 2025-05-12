import { z } from "zod";
import mongoose, { Schema } from "mongoose";

const saloonMongooseSchema: Schema = new Schema({
    name: { type: String, required: true },
    owners: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }]
  },
  { timestamps: true }
);

export const saloonSchema = z.object({
  name: z.string().min(1).max(100),
  owners: z.array(
    z.string()
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid Mongo ObjectId')
      .transform((value) => new mongoose.Types.ObjectId(value))
  )
});

export type SaloonDTO = z.infer<typeof saloonSchema> & { _id: mongoose.Types.ObjectId};
const SaloonModel = mongoose.model<SaloonDTO>("Saloon", saloonMongooseSchema);
export default SaloonModel;
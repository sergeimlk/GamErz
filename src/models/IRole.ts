import mongoose, {Schema, Document} from "mongoose";

export interface IRole extends Document {
  _id: mongoose.Types.ObjectId;
  role: string;
}

const RoleSchema: Schema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, index: true, required: true, auto: true },
  role: { type: String, required: true }
});

export default mongoose.model<IRole>("Role", RoleSchema);
import mongoose from "mongoose";

export interface RoleDTO extends mongoose.Document {
  role: string;
}

// const RoleSchema: Schema = new Schema({
//   role: { type: String, required: true },
// });

// export default mongoose.model<IRole>("Role", RoleSchema);
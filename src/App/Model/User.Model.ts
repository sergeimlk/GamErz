import { z } from "zod";
import mongoose, { Schema } from "mongoose";

const userMongooseSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    pseudo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // motivation: { type: String, required: true },
    avatar: { type: String },
    roleId: { type: mongoose.Types.ObjectId, required: true, ref: "Role" },
  },
  { timestamps: true }
);

export const userSchema = z.object({
  email: z.string().email().min(1).max(255),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  pseudo: z.string().min(1).max(100),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
      message:
        "Password must be at least 8 characters long and contains uppercase, lowercase, digit and special character.",
    }),
  avatar: z.string().max(255).optional(),
  roleId: z.custom<mongoose.Types.ObjectId>(),
});

export const userRegistrationSchema = userSchema.extend({
    confirmationPassword: z.string(),
    motivation: z.string().min(100).max(500),
  })
  .refine((data) => data.password === data.confirmationPassword, {
    path: ["confirmationPassword"],
    message: "Passwords don't match",
  });

export type UserDTO = z.infer<typeof userSchema> & { _id: mongoose.Types.ObjectId};
export type UserRegistrationDTO = z.infer<typeof userRegistrationSchema>;
const UserModel = mongoose.model<UserDTO>("User", userMongooseSchema);
export default UserModel;
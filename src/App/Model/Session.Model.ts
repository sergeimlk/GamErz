import mongoose from "mongoose";
import { z } from "zod";
import { UserDTO, userSchema } from "./User.Model";
import { JWT_REFRESH_MAX_AGE } from "../../constants/env";

export type SessionDTO = {
  userId: mongoose.Types.ObjectId | UserDTO;
  userAgent?: string;
  expiresAt?: Date;
};

export type LoginSessionDTO = {
  accessToken: string;
  refreshToken: string;
};

export const sessionValidationSchema = userSchema
  .pick({ email: true, password: true })
  .extend({ userAgent: z.string().optional()});

const sessionSchema = new mongoose.Schema<SessionDTO>(
  {
    userId: { ref: "User", type: mongoose.Types.ObjectId, index: true },
    userAgent: { type: String },
    expiresAt: { type: Date, default: () => new Date(Date.now() + JWT_REFRESH_MAX_AGE) }
  },
  { timestamps: true }
);

const SessionModel = mongoose.model<SessionDTO>("Session", sessionSchema);
export default SessionModel;
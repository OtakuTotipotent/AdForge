import { InferSchemaType, Model } from "mongoose";

import { mongoose } from "@/lib/db";
import { SubscriptionPlan, UserRole } from "@/features/user";

const { Schema, model, models } = mongoose;

export interface IUser {
  clerkId: string;

  email: string;

  username: string;

  imageUrl: string;

  credits: number;

  role: UserRole;

  subscription: SubscriptionPlan;
}

const userSchema = new Schema<IUser>(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    credits: {
      type: Number,
      default: 20,
      min: 0,
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },

    subscription: {
      type: String,
      enum: Object.values(SubscriptionPlan),
      default: SubscriptionPlan.FREE,
    },
  },
  {
    timestamps: true,
  }
);

export type UserDocument = InferSchemaType<typeof userSchema>;

export const User: Model<IUser> = models.User || model<IUser>("User", userSchema);

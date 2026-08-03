import { InferSchemaType, Model, Schema, model, models } from "mongoose";

import { FREE_CREDITS } from "@/constants/credits";
import { PLANS } from "@/constants/plans";

const userSchema = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },

    username: {
      type: String,
      trim: true,
      default: null,
    },

    firstName: {
      type: String,
      default: null,
      trim: true,
    },

    lastName: {
      type: String,
      default: null,
      trim: true,
    },

    imageUrl: {
      type: String,
      default: null,
    },

    credits: {
      type: Number,
      default: FREE_CREDITS,
      min: 0,
    },

    plan: {
      type: String,
      enum: Object.values(PLANS),
      default: PLANS.FREE,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type UserDocument = InferSchemaType<typeof userSchema>;

export const UserModel: Model<UserDocument> =
  models.User ?? model<UserDocument>("User", userSchema);

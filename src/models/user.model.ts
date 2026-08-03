import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const userSchema = new Schema(
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
      lowercase: true,
      trim: true,
      unique: true,
      index: true,
    },

    username: {
      type: String,
      trim: true,
      default: null,
    },

    firstName: {
      type: String,
      default: null,
    },

    lastName: {
      type: String,
      default: null,
    },

    imageUrl: {
      type: String,
      default: null,
    },

    credits: {
      type: Number,
      default: 20,
      min: 0,
    },

    plan: {
      type: String,
      default: "FREE",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type UserDocument = InferSchemaType<typeof userSchema>;

export const UserModel: Model<UserDocument> =
  models.User || model<UserDocument>("User", userSchema);

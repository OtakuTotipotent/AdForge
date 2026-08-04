import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const generationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    projectName: {
      type: String,
      required: true,
      trim: true,
    },

    productName: {
      type: String,
      required: true,
      trim: true,
    },

    prompt: {
      type: String,
      default: "",
      trim: true,
    },

    orientation: {
      type: String,
      enum: ["portrait", "landscape"],
      required: true,
    },

    productImageUrl: {
      type: String,
      required: true,
    },

    modelImageUrl: {
      type: String,
      required: true,
    },

    generatedImageUrl: {
      type: String,
      default: null,
    },

    generatedVideoUrl: {
      type: String,
      default: null,
    },

    visibility: {
      type: String,
      enum: ["private", "public"],
      default: "private",
      index: true,
    },

    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
      index: true,
    },

    downloads: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type Generation = InferSchemaType<typeof generationSchema>;

export const GenerationModel: Model<Generation> =
  models.Generation ?? model<Generation>("Generation", generationSchema);

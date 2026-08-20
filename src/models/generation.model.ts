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

    description: {
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

    productImagePublicId: {
      type: String,
      required: true,
    },

    productImageUrl: {
      type: String,
      required: true,
    },

    modelImagePublicId: {
      type: String,
      default: null,
    },

    modelImageUrl: {
      type: String,
      default: null,
    },

    generatedImagePublicId: {
      type: String,
      default: null,
    },

    generatedImageUrl: {
      type: String,
      default: null,
    },

    generatedVideoPublicId: {
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

    errorMessage: {
      type: String,
      default: null,
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

export type GenerationCreationData = Omit<
  Generation,
  "_id" | "createdAt" | "updatedAt"
>;

export type GenerationUpdateData = Partial<
  Omit<Generation, "_id" | "createdAt" | "updatedAt">
>;

export const GenerationModel: Model<Generation> =
  (models.Generation as Model<Generation> | undefined) ??
  model<Generation>("Generation", generationSchema);

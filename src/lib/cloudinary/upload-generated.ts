import "server-only";

import { v2 as cloudinary } from "cloudinary";
import { nanoid } from "nanoid";

import { env } from "@/config/env";
import { CLOUDINARY_FOLDERS } from "@/constants/cloudinary";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

interface GeneratedImageUploadResult {
  publicId: string;
  secureUrl: string;
}

export async function uploadGeneratedImage(
  buffer: Buffer,
  mimeType: string,
): Promise<GeneratedImageUploadResult> {
  const dataUri = `data:${mimeType};base64,${buffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder: CLOUDINARY_FOLDERS.ADS,
    public_id: nanoid(),
    resource_type: "image",
  });

  return {
    publicId: result.public_id,
    secureUrl: result.secure_url,
  };
}

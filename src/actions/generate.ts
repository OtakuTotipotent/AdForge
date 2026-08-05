"use server";

import { randomUUID } from "node:crypto";

import { v2 as cloudinary } from "cloudinary";

import { env } from "@/config/env";
import type { UploadedAsset } from "@/types/cloudinary";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(formData: FormData): Promise<UploadedAsset> {
  const file = formData.get("file");

  if (!(file instanceof File)) {
    throw new Error("Image is required.");
  }

  const bytes = await file.arrayBuffer();

  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "adforge/uploads",
          public_id: randomUUID(),
        },
        (error, result) => {
          if (error || !result) {
            reject(error);

            return;
          }

          resolve({
            publicId: result.public_id,
            secureUrl: result.secure_url,
          });
        },
      )
      .end(buffer);
  });
}

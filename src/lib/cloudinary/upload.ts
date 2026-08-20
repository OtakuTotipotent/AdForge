import "server-only";

import { randomUUID } from "node:crypto";
import type { UploadApiResponse } from "cloudinary";
import { cloudinary } from "./client";
import type { CloudinaryUploadResult } from "@/types/cloudinary";

export async function uploadImage(
  file: Buffer,
  folder: string,
): Promise<CloudinaryUploadResult> {
  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        public_id: randomUUID(),
        overwrite: false,
      },
      (error, result) => {
        if (error) {
          reject(error);

          return;
        }

        if (!result) {
          reject(new Error("Cloudinary returned no upload result."));

          return;
        }

        resolve(result);
      },
    );

    stream.end(file);
  });

  return {
    publicId: result.public_id,
    secureUrl: result.secure_url,
    width: result.width,
    height: result.height,
    format: result.format,
    bytes: result.bytes,
    resourceType: "image",
  };
}

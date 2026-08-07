import "server-only";

import { v2 as cloudinary } from "cloudinary";

import { CLOUDINARY_FOLDERS } from "./folders";

export interface UploadImageOptions {
  file: Buffer;
  filename: string;
  folder?: string;
}

export interface UploadedImage {
  publicId: string;
  secureUrl: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

export async function uploadImage({
  file,
  filename,
  folder = CLOUDINARY_FOLDERS.GENERATED_IMAGES,
}: UploadImageOptions): Promise<UploadedImage> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: "image",
          filename_override: filename,
          unique_filename: true,
        },
        (error, result) => {
          if (error || !result) {
            return reject(error);
          }

          resolve({
            publicId: result.public_id,
            secureUrl: result.secure_url,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes,
          });
        },
      )
      .end(file);
  });
}

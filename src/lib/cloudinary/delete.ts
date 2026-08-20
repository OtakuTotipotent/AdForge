import "server-only";

import { cloudinary } from "./client";

export async function deleteImage(publicId: string) {
  return cloudinary.uploader.destroy(publicId, {
    invalidate: true,
  });
}

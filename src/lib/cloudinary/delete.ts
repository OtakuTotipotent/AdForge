import "server-only";

import { cloudinary } from ".";

export async function deleteImage(publicId: string) {
  return cloudinary.uploader.destroy(publicId, {
    invalidate: true,
  });
}

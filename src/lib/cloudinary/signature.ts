import "server-only";

import { cloudinary } from ".";

export function createUploadSignature(folder: string) {
  const timestamp = Math.round(Date.now() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder,
    },
    cloudinary.config().api_secret!,
  );

  return {
    timestamp,
    signature,
    cloudName: cloudinary.config().cloud_name,
    apiKey: cloudinary.config().api_key,
  };
}

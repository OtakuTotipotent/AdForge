"use client";

import type { UploadedImage } from "@/types/image-upload";
import { getUploadSignature } from "./get-upload-signature";

interface UploadImageOptions {
  file: File;
  folder: string;
}

export async function uploadImageClient({
  file,
  folder,
}: UploadImageOptions): Promise<UploadedImage> {
  const signature = await getUploadSignature(folder);

  const formData = new FormData();

  formData.append("file", file);
  formData.append("api_key", signature.apiKey);
  formData.append("timestamp", String(signature.timestamp));
  formData.append("signature", signature.signature);
  formData.append("folder", folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error("Image upload failed.");
  }

  const data = (await response.json()) as {
    public_id: string;
    secure_url: string;
  };

  return {
    publicId: data.public_id,
    secureUrl: data.secure_url,
  };
}

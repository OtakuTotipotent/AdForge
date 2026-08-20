"use client";

import type { CloudinaryUploadResult } from "@/types/cloudinary";
import { getUploadSignature } from "./get-upload-signature";

interface UploadImageOptions {
  file: File;
  folder: string;
}

export async function uploadImageClient({
  file,
  folder,
}: UploadImageOptions): Promise<CloudinaryUploadResult> {
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
    width: number;
    height: number;
    format: string;
    bytes: number;
    resource_type: "image" | "video" | "raw";
  };

  return {
    publicId: data.public_id,
    secureUrl: data.secure_url,
    width: data.width,
    height: data.height,
    format: data.format,
    bytes: data.bytes,
    resourceType: data.resource_type,
  };
}

import "client-only";

import type { UploadSignatureResponse } from "@/types/upload";

export async function getUploadSignature(
  folder: string,
): Promise<UploadSignatureResponse> {
  const response = await fetch("/api/cloudinary/signature", {
    method: "POST",
    body: JSON.stringify({
      folder,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Unable to obtain upload signature.");
  }

  return response.json() as Promise<UploadSignatureResponse>;
}

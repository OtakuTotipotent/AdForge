import { NextResponse } from "next/server";

import { createUploadSignature } from "@/lib/cloudinary/signature";
import { protect } from "@/lib/auth/protect";
import { cloudinarySignatureSchema } from "@/schemas/cloudinary.schema";

export async function POST(request: Request) {
  await protect();

  const body = await request.json();

  const parsed = cloudinarySignatureSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid request.",
      },
      {
        status: 400,
      },
    );
  }

  return NextResponse.json(createUploadSignature(parsed.data.folder));
}

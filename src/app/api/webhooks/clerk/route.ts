import { headers } from "next/headers";
import { Webhook } from "svix";

import { env } from "@/config/env";

export async function POST(req: Request) {
  const payload = await req.text();

  const headerPayload = await headers();

  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing Svix headers.", {
      status: 400,
    });
  }

  const webhook = new Webhook(env.CLERK_WEBHOOK_SECRET);

  try {
    webhook.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    });
  } catch {
    return new Response("Invalid webhook signature.", {
      status: 400,
    });
  }

  return Response.json({
    success: true,
  });
}

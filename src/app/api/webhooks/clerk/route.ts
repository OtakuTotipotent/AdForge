import { headers } from "next/headers";
import { Webhook } from "svix";

import { env } from "@/config/env";

export async function POST(req: Request) {
  const headerPayload = await headers();

  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing Svix headers.", {
      status: 400,
    });
  }

  const payload = await req.text();

  const webhook = new Webhook(env.CLERK_WEBHOOK_SECRET);

  let event: Record<string, unknown>;

  try {
    event = webhook.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as Record<string, unknown>;
  } catch {
    return new Response("Invalid signature.", {
      status: 400,
    });
  }

  console.log(event);

  return Response.json({
    success: true,
  });
}

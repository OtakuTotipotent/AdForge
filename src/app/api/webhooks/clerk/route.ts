import { headers } from "next/headers";
import { Webhook } from "svix";

import { env } from "@/config/env";
import type { ClerkWebhookEvent } from "@/types/webhook";
import {
  handleUserCreated,
  handleUserDeleted,
  handleUserUpdated,
} from "@/lib/auth/webhooks";

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

  let event: ClerkWebhookEvent;

  try {
    event = webhook.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ClerkWebhookEvent;
  } catch {
    return new Response("Invalid signature.", {
      status: 400,
    });
  }

  switch (event.type) {
    case "user.created":
      await handleUserCreated(event.data);
      break;

    case "user.updated":
      await handleUserUpdated(event.data);
      break;

    case "user.deleted":
      await handleUserDeleted(event.data);
      break;
  }

  return Response.json({
    success: true,
  });
}

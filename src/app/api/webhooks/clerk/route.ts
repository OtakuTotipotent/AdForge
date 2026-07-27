import { headers } from "next/headers";
import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";

import { env } from "@/config/env";
import { connectDB } from "@/lib/db";
import { UserService } from "@/features/user";

export async function POST(req: Request) {
  // Verification

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

  let evt: WebhookEvent;

  try {
    const verified = webhook.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    });

    evt = verified as WebhookEvent;
    console.log(evt.type);

    // Database connection

    await connectDB();
    console.log("Database connected successfully");

    // Events Handle

    switch (evt.type) {
      case "user.created": {
        const email = evt.data.email_addresses[0]?.email_address;

        if (!email) break;

        await UserService.createUser({
          clerkId: evt.data.id,

          email,

          username: evt.data.username ?? evt.data.first_name ?? "user",

          imageUrl: evt.data.image_url,
        });

        break;
      }

      case "user.updated": {
        const email = evt.data.email_addresses[0]?.email_address;

        if (!email) break;

        await UserService.updateUser(evt.data.id, {
          email,

          username: evt.data.username ?? evt.data.first_name ?? "user",

          imageUrl: evt.data.image_url,
        });

        break;
      }

      case "user.deleted": {
        if (!evt.data.id) break;

        await UserService.deleteUser(evt.data.id);

        break;
      }

      default:
        break;
    }
  } catch {
    return new Response("Invalid webhook signature.", {
      status: 400,
    });
  }

  return Response.json({
    success: true,
  });
}

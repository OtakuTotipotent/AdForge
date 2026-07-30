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

    console.log(typeof verified);
    console.log(verified);

    evt = verified as WebhookEvent;
    console.log(evt.type);

    // Database connection

    await connectDB();
    console.log("Database connected successfully");

    // Events Handle

    console.log("Webhook type:", evt.type);
    console.log("Webhook data:", evt.data);

    // switch (evt.type) {
    //   case "user.created": {
    //     const email = evt.data.email_addresses[0]?.email_address;

    //     if (!email) break;

    //     // await UserService.createUser({
    //     const user = await UserService.createUser({
    //       clerkId: evt.data.id,

    //       email,

    //       username: evt.data.username ?? evt.data.first_name ?? "user",

    //       imageUrl: evt.data.image_url,
    //     });
    //     console.log(user);

    //     break;
    //   }

    //   case "user.updated": {
    //     const email = evt.data.email_addresses[0]?.email_address;

    //     if (!email) break;

    //     await UserService.updateUser(evt.data.id, {
    //       email,

    //       username: evt.data.username ?? evt.data.first_name ?? "user",

    //       imageUrl: evt.data.image_url,
    //     });

    //     break;
    //   }

    //   case "user.deleted": {
    //     if (!evt.data.id) break;

    //     await UserService.deleteUser(evt.data.id);

    //     break;
    //   }

    //   default:
    //     break;
    // }

    console.log("Reached switch");

    if (evt.type === "user.created") {
      console.log("Inside user.created");

      const email = evt.data.email_addresses[0]?.email_address;

      console.log(email);

      const user = await UserService.createUser({
        clerkId: evt.data.id,
        email,
        username: evt.data.username ?? evt.data.first_name ?? "user",
        imageUrl: evt.data.image_url,
      });

      console.log(user);
    }
  } catch (error) {
    console.error(error);

    return new Response("Webhook failed", {
      status: 400,
    });
  }

  return Response.json({
    success: true,
  });
}

import type { ClerkUserDTO, ClerkWebhookUser } from "@/types/clerk";

export function mapClerkUser(data: ClerkWebhookUser): ClerkUserDTO {
  return {
    clerkId: data.id,

    email: data.email_addresses[0]?.email_address ?? "",

    username: data.username,

    firstName: data.first_name,

    lastName: data.last_name,

    imageUrl: data.image_url,
  };
}

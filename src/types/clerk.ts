export interface ClerkUserDTO {
  clerkId: string;

  email: string;

  username: string | null;

  firstName: string | null;

  lastName: string | null;

  imageUrl: string | null;
}

export interface ClerkEmailAddress {
  email_address: string;
}

export interface ClerkWebhookUser {
  id: string;

  username: string | null;

  first_name: string | null;

  last_name: string | null;

  image_url: string;

  email_addresses: ClerkEmailAddress[];
}

export interface ClerkDeletedUser {
  id: string;

  deleted: boolean;
}

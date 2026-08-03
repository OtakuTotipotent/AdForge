import type { ClerkDeletedUser, ClerkWebhookUser } from "./clerk";

export interface ClerkWebhookEvent<T> {
  type: string;
  data: T;
}

export type UserCreatedEvent = ClerkWebhookEvent<ClerkWebhookUser>;

export type UserUpdatedEvent = ClerkWebhookEvent<ClerkWebhookUser>;

export type UserDeletedEvent = ClerkWebhookEvent<ClerkDeletedUser>;

export type ClerkWebhookEvents =
  UserCreatedEvent | UserUpdatedEvent | UserDeletedEvent;

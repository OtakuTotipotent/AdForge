import type { ClerkDeletedUser, ClerkWebhookUser } from "./clerk";

export interface UserCreatedEvent {
  type: "user.created";
  data: ClerkWebhookUser;
}

export interface UserUpdatedEvent {
  type: "user.updated";
  data: ClerkWebhookUser;
}

export interface UserDeletedEvent {
  type: "user.deleted";
  data: ClerkDeletedUser;
}

export type ClerkWebhookEvent =
  UserCreatedEvent | UserUpdatedEvent | UserDeletedEvent;

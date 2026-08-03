import "server-only";

import type { User } from "@/models/user.model";
import { UserRepository } from "@/repositories/user.repository";

export class UserService {
  static getByClerkId(clerkId: string) {
    return UserRepository.findByClerkId(clerkId);
  }

  static create(data: Partial<User>) {
    return UserRepository.create(data);
  }

  static update(clerkId: string, data: Partial<User>) {
    return UserRepository.updateByClerkId(clerkId, data);
  }

  static upsert(clerkId: string, data: Partial<User>) {
    return UserRepository.upsert(clerkId, data);
  }

  static delete(clerkId: string) {
    return UserRepository.deleteByClerkId(clerkId);
  }
}

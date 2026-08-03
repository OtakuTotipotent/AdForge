import "server-only";

import { UserRepository } from "@/repositories/user.repository";

export class UserService {
  static async getByClerkId(clerkId: string) {
    return UserRepository.findByClerkId(clerkId);
  }

  static async create(data: Parameters<typeof UserRepository.create>[0]) {
    return UserRepository.create(data);
  }

  static async update(
    clerkId: string,
    data: Parameters<typeof UserRepository.updateByClerkId>[1],
  ) {
    return UserRepository.updateByClerkId(clerkId, data);
  }

  static async delete(clerkId: string) {
    return UserRepository.deleteByClerkId(clerkId);
  }
}

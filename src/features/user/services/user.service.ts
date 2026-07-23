import { SubscriptionPlan, UserRole } from "@/features/user";
import { UserRepository } from "../repositories/user.repository";

interface CreateUserInput {
  clerkId: string;
  email: string;
  username: string;
  imageUrl: string;
}

export class UserService {
  static async createUser(data: CreateUserInput) {
    const existingUser = await UserRepository.findByClerkId(data.clerkId);

    if (existingUser) {
      return existingUser;
    }

    return UserRepository.create({
      ...data,
      credits: 20,
      role: UserRole.USER,
      subscription: SubscriptionPlan.FREE,
    });
  }

  static updateUser(
    clerkId: string,
    data: {
      email?: string;
      username?: string;
      imageUrl?: string;
    }
  ) {
    return UserRepository.updateByClerkId(clerkId, data);
  }

  static deleteUser(clerkId: string) {
    return UserRepository.deleteByClerkId(clerkId);
  }
}

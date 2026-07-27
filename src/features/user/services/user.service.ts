import {
  SubscriptionPlan,
  UserRepository,
  UserRole,
  type CreateUserInput,
  type UpdateUserInput,
  createUserSchema,
  updateUserSchema,
} from "@/features/user";

export class UserService {
  static async createUser(data: CreateUserInput) {
    const input = createUserSchema.parse(data);

    const existingUser = await UserRepository.findByClerkId(input.clerkId);

    if (existingUser) {
      return existingUser;
    }

    return UserRepository.create({
      ...input,
      credits: 20,
      role: UserRole.USER,
      subscription: SubscriptionPlan.FREE,
    });
  }

  static updateUser(clerkId: string, data: UpdateUserInput) {
    const input = updateUserSchema.parse(data);

    return UserRepository.updateByClerkId(clerkId, input);
  }

  static deleteUser(clerkId: string) {
    return UserRepository.deleteByClerkId(clerkId);
  }
}
